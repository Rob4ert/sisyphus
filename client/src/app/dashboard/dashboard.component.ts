import { Component } from '@angular/core';
import { Day, Routine, User } from '../interfaces';
import { UserService } from '../user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  //  user
  public user: any;


  // dates
  public baseDate = new Date(Date.now());
  public today = this.baseDate.getDate();
  public dates: any[] = [];

  // routine
  public activeRoutine: any;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.setDates(this.baseDate);
    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
        this.userService.updateActiveRoutine(user.routines);
      }
    });
    this.userService.activeRoutine.subscribe((routine) => {
      if (routine) {
        this.activeRoutine = routine;
        this.setRoutineDays(routine);
      }
    });

  }
  // routine methods

  setRoutineDays(routine: Routine) {
    routine.days.forEach((routineDay: Day) => {
      if (routineDay.weekDays) {
        this.dates.forEach((date) => {
          if (routineDay.weekDays.includes(date.weekDay)) {
            date.routineDay = routineDay;
            date.isWorkDay = true;
          }
        });
      }
    });
  }


  // dates methods
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
        isWorkDay: false,
        isToday: this.isToday(date)
      });
      date.setDate(date.getDate() + 1);
    }

  }

  isToday(date: Date) {
    const today = new Date();
    return date.getDate() == today.getDate() &&
      date.getMonth() == today.getMonth() &&
      date.getFullYear() == today.getFullYear();
  }


  // button handlers

  moveForward() {
    this.baseDate.setDate(this.baseDate.getDate() - 1);
    this.setDates(this.baseDate);
    this.setRoutineDays(this.activeRoutine);
  }

  moveBack() {
    this.baseDate.setDate(this.baseDate.getDate() - 3);
    this.setDates(this.baseDate);
    this.setRoutineDays(this.activeRoutine);
  }




}
