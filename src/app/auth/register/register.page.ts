import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';
import {
  ToastController,
  AlertController,
} from '@ionic/angular';
import { User } from 'src/app/users/interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = {
    username: '',
    name: '',
    password: '',
    email: '',
    avatar: '',
    lat: 0,
    lng: 0,
    guardados: [],
    sos: 112
  };
  email2 = '';

  constructor(
    private authService: AuthService,
    private toast: ToastController,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.resetForm();

    navigator.geolocation.getCurrentPosition((pos) => {
      this.user.lat = pos.coords.latitude;
      this.user.lng = pos.coords.longitude;
    });
  }

  resetForm() {
    this.user = {
      username: '',
      name: '',
      password: '',
      email: '',
      avatar: '/assets/img/user.png',
      lat: 0,
      lng: 0,
      guardados: [],
      sos: 112
    };
    this.email2 = '';
  }

  register() {
    this.authService.register(this.user).subscribe(async () => {
      (
        await this.toast.create({
          duration: 3000,
          position: 'bottom',
          color: 'success',
          icon: 'information-circle',
          message: `Bienvenid@ ${this.user.name}!`
        })
      ).present();
      this.authService.login(this.user.username, this.user.password).subscribe(
        () => {
          this.resetForm();
          this.router.navigate(['/areas']);
      },
        async (error) => {
          (
            await this.alertCtrl.create({
              header: 'Fallo en el inicio de sesión',
              message: 'Ooops! Algo salió mal. Por favor, inténtelo de nuevo.',
              buttons: ['Aceptar'],
            })
          ).present();
        }
      );
    });
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

    this.user.avatar = photo.dataUrl;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 400,
      width: 400,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });

    this.user.avatar = photo.dataUrl;
  }
}
