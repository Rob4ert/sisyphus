import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})
export class LoginCardComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email, Validators.max(50)]);
  name = new FormControl('', [Validators.required, Validators.max(40), Validators.pattern('[a-zA-Z ]*')]);
  password = new FormControl('', [Validators.required, Validators.min(6), Validators.max(20)]);
  repeatPassword = new FormControl('', [Validators.required, Validators.min(6), Validators.max(20)]);

  constructor() { }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordError() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    } else if (this.password.value !== this.repeatPassword.value) {
      return 'password do not match!';
    }
    return '';
  }


  ngOnInit(): void {
  }

}
