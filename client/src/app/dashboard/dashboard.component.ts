import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIClientService } from '../api-client.service';
import { User } from '../interfaces';
import { UserService } from '../user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  //  user
  public user: User | null = null;
  public subscription: Subscription | undefined;

  // dates
  public baseDate = new Date(Date.now());
  public today = this.baseDate.getDate();
  public dates: any[] = [];

  // routine
  public routines = this.user?.routines;
  public activeRoutine = this.user?.routines[1];

  constructor(
    private userService: UserService,
    private http: APIClientService,
  ) { }

  ngOnInit() {
    this.subscription = this.userService.currentUser.subscribe(user => {
      this.user = user;
      this.setDates(this.baseDate);
      this.setRoutineDays(user);
    });


  }

  setRoutineDays(user: any) {
    user.routines[1].days.forEach((routineDay: any) => {
      const weekDays = JSON.parse(routineDay.weekDays);
      console.log('weekDays :>> ', weekDays);
      this.dates.forEach((date) => {
        if (weekDays.includes(date.weekDay)) {
          date.routineDay = routineDay;
        }
      });
    });
  }

  setDates(date: Date) {
    this.dates = [];
    date.setDate(date.getDate() - 1);
    for (let i = 0; i < 3; i++) {
      this.dates.push({
        month: date.toLocaleDateString('en-US', { month: 'long' }),
        name: date.toLocaleDateString('en-US', { weekday: 'long' }),
        number: date.getDate(),
        weekDay: date.getDay()
      });
      date.setDate(date.getDate() + 1);
    }
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
