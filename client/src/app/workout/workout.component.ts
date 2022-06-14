import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
  public workout: any;

  public routineForm: FormGroup = this.fb.group({
    exercises: this.fb.array([])
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) { }

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
        console.log('this.workout :>> ', this.workout);
      }
    });
  }


  setRoutineDay(routine: Routine) {
    routine.days.forEach((workout: Day) => {
      if (workout.weekDays.includes(this.baseDate.getDay())) {
        this.workout = workout;
      }
    });
  }


  // exercise logic

  exercises(): FormArray {
    return this.routineForm.get('exercises') as FormArray;
  }

  newExercise(): FormGroup {
    return this.fb.group({
      exerciseName: '',
      sets: 1,
      reps: 1,
    });
  }

  addExercise() {
    this.exercises().push(this.newExercise());
  }

  removeExercise(exerciseIndex: number) {
    this.exercises().removeAt(exerciseIndex);
  }



  // exercises(dayIndex: number): FormArray {
  //   return this.days()
  //     .at(dayIndex)
  //     .get('exercises') as FormArray;
  // }

  // newExercise(): FormGroup {
  //   return this.fb.group({
  //     exerciseName: '',
  //     sets: 1,
  //     reps: 1,

  //   });
  // }

  // addExercise(dayIndex: number) {
  //   this.exercises(dayIndex).push(this.newExercise());
  // }

  // removeExercise(dayIndex: number, skillIndex: number) {
  //   this.exercises(dayIndex).removeAt(skillIndex);
  // }
}



