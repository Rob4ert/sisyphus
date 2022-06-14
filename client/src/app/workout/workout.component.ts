import { Component, OnInit } from '@angular/core';
import { Day, Routine } from '../interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {


  public user: any;
  public activeRoutine: any;

  public baseDate = new Date(Date.now());
  public routineDay: any;

  constructor(private userService: UserService,) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
    this.userService.activeRoutine.subscribe((routine) => {
      if (routine) {
        this.activeRoutine = routine;
        this.setRoutineDay(routine);
      }
    });
  }


  setRoutineDay(routine: Routine) {
    routine.days.forEach((routineDay: Day) => {
      if (routineDay.weekDays.includes(this.baseDate.getDay())) {
        this.routineDay = routineDay;
      }
    });
  }
}



