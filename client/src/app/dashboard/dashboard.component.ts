import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public baseDate = new Date(Date.now());
  public today = this.baseDate.getDate();
  public dates: any[] = [];

  constructor() { }

  ngOnInit() {
    this.setDates(this.baseDate);
  }


  setDates(date: Date) {
    this.dates = [];
    date.setDate(date.getDate() - 1);
    for (let i = 0; i < 3; i++) {
      this.dates.push({
        month: date.toLocaleDateString('en-US', { month: 'long' }),
        name: date.toLocaleDateString('en-US', { weekday: 'long' }),
        number: date.getDate()
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
