import { Routine } from './../interfaces';
import { Component, OnInit } from '@angular/core';
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
  public user: User | null = null;



  public activeRoutine: Routine | null = null;

  displayedColumns: string[] = ['name', 'sets', 'reps'];

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
    this.userService.activeRoutine.subscribe(routine => {
      if (this.user) {
        this.activeRoutine = routine;
      }
    });

  }

  // updateActiveRoutine(routines: Routine[]) {
  //   routines.map((routine) => {
  //     if (routine.isActive) {
  //       this.userService.updateActiveRoutine(routine);
  //     }
  //   });
  // }

  activateRoutine() {
    if (this.activeRoutine && this.user) {
      const id = this.activeRoutine.id;
      this.user.routines.forEach(routine => {
        routine.isActive = routine.id === id;
      });
      this.http.selectRoutine(this.user.routines).subscribe((routines) => this.userService.updateActiveRoutine(routines));
    }
  }

}


