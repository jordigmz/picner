/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { MarkerComponent } from 'ngx-mapbox-gl';
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
export class AreasFormPage implements OnInit {
  idArea = '';
  area: Area = {
    name: '',
    description: '',
    image: '',
    lat: 38.408131,
    lng: -0.792284,
    creator: '',
    address: 'Selecciona una dirección en el mapa'
  };

  user: User = {
    name: '',
    username: '',
    email: '',
    password: '',
    avatar: '',
    lat: 0,
    lng: 0,
    guardados: [],
    sos: 112
  };

  edit = false;

  imageName = '';
  posted = false;
  edited = false;

  @ViewChild('areasForm') areasForm!: NgForm;
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private areasService: AreasService,
    private usersService: UsersService,
    private toastCtrl: ToastController,
    private nav: NavController,
    private alertCrl: AlertController
  ) { }

  async ngOnInit() {
    if (this.router.url.includes('edit')) {
      this.edit = true;
      this.route.params.subscribe((param) => (this.idArea = param['id']));
      this.areasService.getArea(this.idArea).subscribe((area) => {
        this.area = area;
        this.user.lng = area.lng;
        this.user.lat = area.lat;
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

  changeLngLat(marker: MarkerComponent) {
    this.area.lng = +marker.markerInstance.getLngLat().lng;
    this.area.lat = +marker.markerInstance.getLngLat().lat;
  }

  changePosition(result: Result) {
    this.area.lat = result.geometry.coordinates[1];
    this.area.lng = result.geometry.coordinates[0];
    this.area.address = result.place_name;
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
      address: 'Selecciona una dirección en el mapa'
    };
    this.imageName = '';
  }

  isEdited() {
    this.edited = true;
  }

  async canDeactivate() {
    if (this.router.url.includes('edit') && !this.posted && this.edited) {
      const alert = await this.alertCrl.create({
        header: 'Se perderán todos los cambios',
        message: '¿Quieres guardar antes de salir?',
        buttons: [
          {
            text: 'Aceptar',
            role: 'goBack',
            handler: () => {
              this.uploadArea();
            }
          },
          {
            text: 'Salir',
            role: 'goBack'
          },
          {
            text: 'Cancelar',
            role: 'cancel'
          }
        ]
      });
      await alert.present();

      const data = await alert.onDidDismiss();
      if (data.role === 'goBack') {
        return true;
      }
    } else {
      return true;
    }
  }

  uploadArea() {
    if (this.router.url.includes('edit')) {
      this.areasService.editArea(this.area).subscribe(
        async (ev) => {
          this.posted = true;
          (
            await this.toastCtrl.create({
              duration: 1200,
              position: 'bottom',
              color: 'success',
              icon: 'information-circle',
              message: 'Se ha actualizado el área.',
            })
          ).present();
          this.nav.navigateBack(['/areas']);
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
          this.nav.navigateBack(['/areas']);
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
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });

    this.area.image = photo.dataUrl;
    this.edited = true;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 400,
      width: 400,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });

    this.area.image = photo.dataUrl;
    this.edited = true;
  }
}
