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

  public routine = this.user?.routines[0];

  constructor(
    private userService: UserService,
    private http: APIClientService,
  ) { }

  ngOnInit() {
    this.subscription = this.userService.currentUser.subscribe(user => {
      this.user = user;
      this.http.getRoutine(user?.routines[0].id).subscribe((res) => console.log('res :>> ', res));
    });
    this.setDates(this.baseDate);

  }

  // setRoutineDays() {
  //   this.routine.days.map((day) => {

  //   })
  // }

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
