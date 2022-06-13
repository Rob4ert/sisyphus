import { Routine } from './../interfaces';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../interfaces';
import { UserService } from '../user.service';
import { APIClientService } from '../api-client.service';



@Component({
  selector: 'app-routine-menu',
  templateUrl: './routine-menu.component.html',
  styleUrls: ['./routine-menu.component.css']
})
export class RoutineMenuComponent implements OnInit {

  constructor(
    private userService: UserService,
    private http: APIClientService
  ) { }
  user: User | null = null;

  subscription: Subscription | null = null;

  activeRoutine: any = '';

  displayedColumns: string[] = ['name', 'sets', 'reps'];

  ngOnInit(): void {
    this.subscription = this.userService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  activateRoutine() {
    const id = this.activeRoutine.id;
    if (this.user) {
      this.user.routines.forEach(routine => {
        routine.active = routine.id === id;
      });
      this.http.selectRoutine(this.user.routines).subscribe((res) => console.log('res :>> ', res));
    }
  }

}


