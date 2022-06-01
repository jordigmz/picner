import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/users/interfaces/user';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.scss'],
})
export class PasswordModalComponent implements OnInit {
  user: User;
  password = '';
  password2 = '';

  constructor(
    private modalCtrl: ModalController,
    private usersService: UsersService,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.usersService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  editPassword() {
    this.usersService.editPassword(this.password).subscribe(async () => {
      (
        await this.toast.create({
          duration: 1200,
          position: 'bottom',
          color: 'success',
          icon: 'information-circle',
          message: 'Contraseña actualizada.',
        })
      ).present();
      this.close();
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
