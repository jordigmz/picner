import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController, ToastController } from '@ionic/angular';
import { MapComponent } from 'ngx-mapbox-gl';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';
import { NameModalComponent } from './modal/name-modal/name-modal/name-modal.component';
import { PasswordModalComponent } from './modal/password-modal/password-modal/password-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, AfterViewInit {
  @ViewChild(MapComponent) mapComp: MapComponent;
  idUser = '';
  user: User = {
    name: '',
    username: '',
    email: '',
    password: '',
    avatar: '',
    lat: 38.4039418,
    lng: -0.5288701,
  };
  lat = 38.4039418;
  lng = -0.5288701;
  newPassword1 = '';
  newPassword2 = '';
  errorMessage = '';

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private toast: ToastController
  ) {}

  ngOnInit() {
    if (this.router.url.includes('me')) {
      this.usersService.getUser().subscribe((user) => {
        this.user = user;
        this.lng = user.lng as number;
        this.lat = user.lat as number;
      });
    } else {
      this.route.params.subscribe((param) => (this.idUser = param.id));
      this.usersService.getUser(this.idUser).subscribe((user) => {
        this.user = user;
        this.lng = user.lng as number;
        this.lat = user.lat as number;
      });
    }
  }

  ngAfterViewInit() {
    this.mapComp.mapLoad.subscribe(() => {
      this.mapComp.mapInstance.resize();
    });
  }

  async editProfile() {
    const modal = await this.modalCtrl.create({
      component: NameModalComponent,
      componentProps: { user: this.user.name, email: this.user.email },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.user.name && result.data.user.email) {
      this.user.name = result.data.user.name;
      this.user.email = result.data.user.email;
    }
  }

  async editPassword(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: PasswordModalComponent,
      componentProps: { password: this.user.password },
    });
    await modal.present();
    const password: string = this.newPassword1;
    const password2: string = this.newPassword2;
    const passwordEquals: boolean = password === password2;

    if (passwordEquals) {
      this.user.password = password;
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

    this.user.avatar = photo.dataUrl;

    this.usersService.editAvatar(this.user.avatar).subscribe(async () => {
      (
        await this.toast.create({
          duration: 1200,
          position: 'bottom',
          color: 'success',
          icon: 'information-circle',
          message: 'Avatar changed!',
        })
      ).present();
    });
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });

    this.user.avatar = photo.dataUrl;

    this.usersService.editAvatar(this.user.avatar).subscribe(async () => {
      (
        await this.toast.create({
          duration: 1200,
          position: 'bottom',
          color: 'success',
          icon: 'information-circle',
          message: 'Avatar changed!',
        })
      ).present();
    });
  }
}
