import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../interfaces';
import { UserService } from '../user.service';
NgModel;



@Component({
  selector: 'app-routine-menu',
  templateUrl: './routine-menu.component.html',
  styleUrls: ['./routine-menu.component.css']
})
export class RoutineMenuComponent implements OnInit {

  constructor(private userService: UserService) { }
  user: User | null = null;
  selectedRoutine: any = '';


  subscription: Subscription | null = null;



  ngOnInit(): void {
    this.subscription = this.userService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

}


