import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSource = new BehaviorSubject<User | null>(null);;
  currentUser = this.userSource.asObservable();
  constructor() { }

  updateUser(user: User) {
    this.userSource.next(user);
  }
}
