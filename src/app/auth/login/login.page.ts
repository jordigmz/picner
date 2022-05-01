import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  firebaseToken = null;
  user = null;
  accessToken = '';

  constructor() { }

  ngOnInit() {
  }

  login() {
  }
}
