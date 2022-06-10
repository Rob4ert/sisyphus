import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIClientService } from '../api-client.service';
import { User } from '../interfaces';

@Component({
  selector: 'app-login-card',
  templateUrl: './signIn-card.component.html',
  styleUrls: ['./signIn-card.component.css']
})
export class SignInCardComponent implements OnInit {
  public signIn: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.max(50)]),
    name: new FormControl('', [Validators.required, Validators.max(40), Validators.pattern('[a-zA-Z ]*')]),
    password: new FormControl('', [Validators.required, Validators.min(6), Validators.max(20)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.min(6), Validators.max(20)]),
  });

  public isLogging: boolean = true;
  public passwordMatch: boolean = true;

  constructor(private http: APIClientService, private snackBar: MatSnackBar) { }


  getErrorMessage() {
    if (this.signIn.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.signIn.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  checkPassword() {
    this.passwordMatch = this.signIn.get('password')?.value === this.signIn.get('repeatPassword')?.value ? true : false;
  }

  getPasswordError() {
    if (this.signIn.get('password')?.hasError('required')) {
      return 'You must enter a value';
    } else if (this.signIn.get('password')?.value !== this.signIn.get('repeatPassword')?.value) {
      return 'password do not match!';
    }
    return '';
  }

  isLoggingToggler() {
    this.isLogging = !this.isLogging;
  }

  handleSubmit(event: User) {
    this.checkPassword();
    if (this.signIn.valid && this.signIn.get('password')?.value === this.signIn.get('repeatPassword')?.value) {
      delete event.passwordRepeat;
      this.http.createUser(event).subscribe((user) => {
        this.signIn.reset();
        this.snackBar.open(`Your account has been created!`, 'Dismiss', {
          duration: 2000,
        });
      });
    }
  }

  ngOnInit(): void {
  }

}
