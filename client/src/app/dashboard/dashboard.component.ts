import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIClientService } from '../api-client.service';
import { Day, User } from '../interfaces';
import { UserService } from '../user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  //  user
  public user: any;
  public subscription: Subscription | undefined;

  // dates
  public baseDate = new Date(Date.now());
  public today = this.baseDate.getDate();
  public dates: any[] = [];

  // routine
  public routines: any;
  public activeRoutine: any;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.subscription = this.userService.currentUser.subscribe(user => {
      this.user = user;
      this.setDates(this.baseDate);
      if (user) {
        this.setRoutineDays(user);
        this.activeRoutine = this.user?.routines[1];
        this.routines = this.user?.routines;
      };
    });


  }


  setRoutineDays(user: User) {
    user.routines[2].days.forEach((routineDay: Day) => {
      if (routineDay.weekDays) {
        const weekDays = routineDay.weekDays;
        this.dates.forEach((date) => {
          if (weekDays.includes(date.weekDay)) {
            date.routineDay = routineDay;
            date.isWorkDay = true;
          }
        });
      }
    });

  }

  setDates(date: Date) {
    this.dates = [];
    date.setDate(date.getDate() - 1);
    for (let i = 0; i < 3; i++) {
      this.dates.push({
        month: date.toLocaleDateString('en-US', { month: 'long' }),
        name: date.toLocaleDateString('en-US', { weekday: 'short' }),
        number: date.getDate(),
        weekDay: date.getDay(),
        routineDay: { dayName: "Nothing for Today." },
        isWorkDay: false
      });
      date.setDate(date.getDate() + 1);
    }
    this.setRoutineDays(this.user);
  }

  moveForward() {
    this.baseDate.setDate(this.baseDate.getDate() - 1);
    this.setDates(this.baseDate);
  }

  moveBack() {
    this.baseDate.setDate(this.baseDate.getDate() - 3);
    this.setDates(this.baseDate);
  }

  getTodayNumber() {
    return new Date().getDate();
  }

}
