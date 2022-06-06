import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/users/interfaces/user';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-name-modal',
  templateUrl: './name-modal.component.html',
  styleUrls: ['./name-modal.component.scss'],
})
export class NameModalComponent implements OnInit {
  user: User;
  name = '';
  email = '';

  userForm!: FormGroup;
  emailGroupFrom!: FormGroup;
  constructor(private modalCtrl: ModalController, private usersService: UsersService, private toast: ToastController) { }

  ngOnInit() {
    this.usersService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  editNameAndEmail() {
    this.usersService.editUser(this.user).subscribe(
      async () => {
        (await this.toast.create({
          duration: 1200,
          position: 'bottom',
          color: 'success',
          icon: 'information-circle',
          message: 'Información de la cuenta actualizada.'
        })).present();
        this.close();
      }
    );
  }

  close() {
    this.modalCtrl.dismiss(this.user);
  }
}
