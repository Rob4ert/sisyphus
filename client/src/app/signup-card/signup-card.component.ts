import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIClientService } from '../api-client.service';
import { User } from '../interfaces';

@Component({
  selector: 'app-signup-card',
  templateUrl: './signup-card.component.html',
  styleUrls: ['./signup-card.component.css']
})
export class SignupCardComponent implements OnInit {
  public signup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.max(50)]),
    name: new FormControl('', [Validators.required, Validators.max(40), Validators.pattern('[a-zA-Z ]*')]),
    password: new FormControl('', [Validators.required, Validators.min(6), Validators.max(20)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.min(6), Validators.max(20)]),
  });

  public isLogging: boolean = true;

  constructor(private http: APIClientService, private snackBar: MatSnackBar) { }


  getErrorMessage() {
    if (this.signup.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.signup.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  AreMatching() {
    const matched: boolean = this.signup.get('password')?.value === this.signup.get('repeatPassword')?.value;
    if (matched) {
      this.signup.get('repeatPassword')?.setErrors(null);
    } else {
      this.signup.get('repeatPassword')?.setErrors({
        notMatched: true
      });
    }
    return matched;
  }

  getPasswordError() {
    if (this.signup.get('password')?.hasError('required')) {
      return 'You must enter a value';
    } else if (this.signup.get('password')?.value !== this.signup.get('repeatPassword')?.value) {
      return 'password do not match!';
    }
    return '';
  }

  signUpUser(user: User) {
    this.AreMatching();
    if (this.signup.valid && this.signup.get('password')?.value === this.signup.get('repeatPassword')?.value) {
      delete user.repeatPassword;
      this.http.createUser(user).subscribe(() => {
        this.signup.reset();
        this.snackBar.open(`Your account has been created!`, 'Dismiss', {
          duration: 2000,
        });
      });
    }
  }

  ngOnInit(): void {
  }

}
