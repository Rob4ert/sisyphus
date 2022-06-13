import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../interfaces';
import { UserService } from '../user.service';



@Component({
  selector: 'app-routine-menu',
  templateUrl: './routine-menu.component.html',
  styleUrls: ['./routine-menu.component.css']
})
export class RoutineMenuComponent implements OnInit {

  constructor(private userService: UserService) { }
  user: User | null = null;
  subscription: Subscription | undefined;


  ngOnInit(): void {
    this.subscription = this.userService.currentUser.subscribe(user => {
      this.user = user;
      console.log('user routine menu :>> ', this.user);
    });
  }

}


