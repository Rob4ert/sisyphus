import { Routine } from './../interfaces';
import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces';
import { UserService } from '../user.service';
import { APIClientService } from '../api-client.service';
import { NotificationsService } from '../notifications.service';



@Component({
  selector: 'app-routine-menu',
  templateUrl: './routine-menu.component.html',
  styleUrls: ['./routine-menu.component.css']
})
export class RoutineMenuComponent implements OnInit {

  constructor(
    private notification: NotificationsService,
    private userService: UserService,
    private http: APIClientService
  ) { }
  public user: User | null = null;

  public weekdays: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

  activateRoutine() {
    if (this.activeRoutine && this.user) {
      const id = this.activeRoutine.id;
      this.user.routines.forEach(routine => {
        routine.isActive = routine.id === id;
      });
      this.http.selectRoutine(this.user.routines).subscribe((routines) => {
        this.userService.updateActiveRoutine(routines);
        this.notification.createNotification(`${this.activeRoutine?.routineName}, activated!`);
      });
    }
  }

  deleteRoutine() {
    if (this.activeRoutine && this.user) {
      this.http.deleteRoutine(this.activeRoutine).subscribe((deletedRoutine) => {
        if (this.user) {
          const newRoutines = this.user.routines.filter((routine) => {
            return routine.id !== deletedRoutine.id;

          });
          this.user.routines = newRoutines;
          this.userService.updateUser(this.user);
          this.notification.createNotification(`${deletedRoutine.routineName}, deleted!`);
        }
      });
    }

  }

}
