/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-ordering */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { NavController, ToastController } from '@ionic/angular';
import { MapComponent } from 'ngx-mapbox-gl';
import { Result } from 'ngx-mapbox-gl-geocoder-control';
import { Area } from '../interfaces/areas';
import { AreasService } from '../services/areas.service';

@Component({
  selector: 'app-areas-form',
  templateUrl: './areas-form.page.html',
  styleUrls: ['./areas-form.page.scss'],
})
export class AreasFormPage implements OnInit, AfterViewInit {
  idArea = '';
  @ViewChild(MapComponent) mapComp: MapComponent;
  area: Area = {
    name: '',
    description: '',
    image: '',
    lat: 38.408131,
    lng: -0.792284,
    address: 'C. Novelda, Alicante'
  };
  lat = 38.408131;
  lng = -0.792284;

  imageName = '';
  posted = false;

  @ViewChild('areasForm') areasForm!: NgForm;
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private areasService: AreasService,
    private toastCtrl: ToastController,
    private nav: NavController
  ) { }

  async ngOnInit() {
    if (this.router.url.includes('edit')) {
      this.route.params.subscribe((param) => (this.idArea = param['id']));
      this.areasService.getArea(this.idArea).subscribe((area) => {
        this.area = area;
        this.area.lng = area.lng as number;
        this.area.lat = area.lat as number;
      });
    } else {
      this.resetForm();

      const coordinates = await Geolocation.getCurrentPosition();
      this.area.lat = coordinates.coords.latitude;
      this.area.lng = coordinates.coords.longitude;
    }
  }

  ngAfterViewInit() {
    this.mapComp.mapLoad.subscribe(() => {
      this.mapComp.mapInstance.resize();
    });
  }

  changePosition(result: Result) {
    this.area.lat = result.geometry.coordinates[1];
    this.area.lng = result.geometry.coordinates[0];
    this.area.address = result.place_name;
  }

  canDeactivate() {
    if (this.router.url.includes('edit')) {
      return (
        this.areasForm.pristine ||
        this.posted ||
        this.uploadArea()
      );
    } else {
      return (
        this.areasForm.pristine ||
        this.posted ||
        confirm('¿Quieres abandonar la página?. Se perderán todos los cambios.')
      );
    }
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.area.image = reader.result as string;
    });
  }

  resetForm() {
    this.area = {
      name: '',
      description: '',
      image: '',
      lat: 0,
      lng: 0,
      address: 'C. Alfonso el Sabio, 29, 03660 Novelda, Alicante'
    };
    this.imageName = '';
  }

  uploadArea() {
    if (this.router.url.includes('edit')) {
      this.areasService.editArea(this.area).subscribe(
        async (ev) => {
          (
            await this.toastCtrl.create({
              position: 'bottom',
              duration: 3000,
              message: 'Area edited succesfully',
              color: 'success',
            })
          ).present();
          this.nav.navigateRoot(['/areas']);
        },
        async (error) =>
          (
            await this.toastCtrl.create({
              position: 'bottom',
              duration: 3000,
              message: 'Error editting area',
            })
          ).present()
      );
    } else {
      this.areasService.addArea(this.area).subscribe(
        async (ev) => {
          (
            await this.toastCtrl.create({
              position: 'bottom',
              duration: 3000,
              message: 'Area added succesfully',
              color: 'success',
            })
          ).present();
          this.nav.navigateRoot(['/areas']);
        },
        async (error) =>
          (
            await this.toastCtrl.create({
              position: 'bottom',
              duration: 3000,
              message: 'Error adding area',
            })
          ).present()
      );
    }
  }

  async takePhoto() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });

    this.area.image = photo.dataUrl;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });

    this.area.image = photo.dataUrl;
  }
}
