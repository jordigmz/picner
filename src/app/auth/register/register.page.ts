import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {
    username: '',
    name: '',
    password: '',
    email: '',
    avatar: '',
    lat: 0,
    lng: 0
  };
  email2 = '';

  constructor() { }

  ngOnInit() {
  }

  register() {

  }

  takePhoto() {

  }

  pickFromGallery() {

  }

}
