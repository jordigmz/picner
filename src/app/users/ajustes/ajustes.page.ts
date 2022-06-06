/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {
  me: User = {
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

  @ViewChild('sosForm') sosForm!: NgForm;
  constructor(
    private usersService: UsersService,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.usersService.getUser().subscribe((user) => {
      this.me = user;
    });
  }

  changeSOS() {
    this.me.sos = +this.me.sos;
    this.usersService.editUser(this.me).subscribe(
      async () => {
        (await this.toast.create({
          duration: 1200,
          position: 'bottom',
          color: 'success',
          icon: 'information-circle',
          message: 'Contacto de emergencia actualizado.'
        })).present();
      }
    );
  }
}
