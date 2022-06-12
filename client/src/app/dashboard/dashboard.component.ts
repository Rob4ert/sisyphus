import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public today = new Date(Date.now()).getDate();

  public dates: any[] = [];
  constructor() { }

  ngOnInit() {
    this.getDates();
  }


  getDates() {
    let baseDate = new Date(Date.now());
    baseDate.setDate(baseDate.getDate() - 3);
    this.dates;
    for (let i = 0; i < 7; i++) {
      this.dates.push({
        month: baseDate.toLocaleDateString('en-US', { month: 'long' }),
        name: baseDate.toLocaleDateString('en-US', { weekday: 'long' }),
        number: baseDate.getDate()
      });
      baseDate.setDate(baseDate.getDate() + 1);
    }
    console.log('this.today :>> ', this.today);
    console.log('this.dates :>> ', this.dates);
  }


  getTodayNumber() {
    return new Date().getDate();
  }

}
