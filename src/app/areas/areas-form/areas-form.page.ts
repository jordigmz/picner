/* eslint-disable no-underscore-dangle */
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
import { User } from 'src/app/users/interfaces/user';
import { UsersService } from 'src/app/users/services/users.service';
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
    creator: '',
    address: ''
  };

  user: User;

  imageName = '';
  posted = false;

  @ViewChild('areasForm') areasForm!: NgForm;
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private areasService: AreasService,
    private usersService: UsersService,
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
      this.usersService.getUser().subscribe((user) => {
        this.user = user;
      });

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
      creator: '',
      address: ''
    };
    this.imageName = '';
  }

  uploadArea() {
    if (this.router.url.includes('edit')) {
      this.areasService.editArea(this.area).subscribe(
        async (ev) => {
          (
            await this.toastCtrl.create({
              duration: 1200,
              position: 'bottom',
              color: 'success',
              icon: 'information-circle',
              message: 'Se ha actualizado el área.',
            })
          ).present();
          this.nav.navigateRoot(['/areas']);
        },
        async (error) =>
          (
            await this.toastCtrl.create({
              duration: 1200,
              position: 'bottom',
              color: 'danger',
              icon: 'alert-circle-sharp',
              message: 'Error editando el área.',
            })
          ).present()
      );
    } else {
      this.area.creator = this.user._id;

      console.log(this.area);
      this.areasService.addArea(this.area).subscribe(
        async (ev) => {
          (
            await this.toastCtrl.create({
              duration: 1200,
              position: 'bottom',
              color: 'success',
              icon: 'information-circle',
              message: '¡Nueva área publicada!',
            })
          ).present();
          this.nav.navigateRoot(['/areas']);
        },
        async (error) =>
          (
            await this.toastCtrl.create({
              duration: 1200,
              position: 'bottom',
              color: 'danger',
              icon: 'alert-circle-sharp',
              message: 'Error publicando el área.',
            })
          ).present()
      );
    }
  }

  async takePhoto() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 400,
      width: 400,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });

    this.area.image = photo.dataUrl;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 400,
      width: 400,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });

    this.area.image = photo.dataUrl;
  }
}
