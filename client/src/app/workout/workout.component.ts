import { ExerciseSets, SetList } from './../interfaces';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Day, Routine } from '../interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  // formGroup workoutform => formarray exercises => formgroup exerciseIndex => formarray sets => formgroup setIndex
  public user: any;
  public activeRoutine: any;

  public baseDate = new Date(Date.now());
  public workout: any;

  public exerciseList: ExerciseSets[] = [{ exerciseName: 'pull ups', setList: [{ reps: 10, isFail: false, isFinished: false }], reps: 10 }];

  // const arr = new FormArray([

  // ]);


  setsArray = new FormArray([


  ]);

  public workoutForm: FormGroup = this.fb.group({
    sets: this.setsArray
  });


  // public workoutForm: FormGroup = this.fb.group({
  //   exercises: this.fb.array([
  //     //   this.fb.group({
  //     //     sets: this.fb.array([
  //     //       this.fb.group({
  //     //         reps: new FormControl('reps'),
  //     //         weight: new FormControl('weight'),
  //     //         isDone: new FormControl('isDone'),
  //     //         isFail: new FormControl('isFail'),
  //     //       })
  //     //     ])
  //     //   })
  //     //   // new FormControl('reps'),
  //     //   // new FormControl('weight'),
  //     //   // new FormControl('isDone'),
  //     //   // new FormControl('isFail'),
  //   ])
  // });

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
        this.setSets();
      }
    });
    this.createSetsGroups(4);
  }

  // sets working from here
  sets(): FormArray {
    return this.workoutForm.get('sets') as FormArray;
  }


  createSetsGroups(num: number) {
    for (let i = 0; i < num; i++) {
      this.setsArray.push(
        this.fb.group({
          reps: new FormControl('reps'),
          weight: new FormControl('weight'),
          isDone: new FormControl('isDone'),
          isFail: new FormControl('isFail'),
        })

      );

    }

  }
  // to here


  setRoutineDay(routine: Routine) {
    routine.days.forEach((workout: Day) => {
      if (workout.weekDays.includes(this.baseDate.getDay())) {
        this.workout = workout;
      }
    });
  }


  // exercise logic

  exercises(): FormArray {
    return this.workoutForm.get('exercises') as FormArray;
  }

  // newExercise(): FormGroup {
  //   return this.fb.group({
  //     exerciseName: '',
  //     sets: 1,
  //     reps: 1,
  //   });
  // }

  // sets(exerciseIndex: number): FormArray {
  //   return this.exercises()
  //     .at(exerciseIndex)
  //     .get('sets') as FormArray;
  // }


  // addExercise() {
  //   this.exercises().push(this.newExercise());
  // }

  // removeExercise(exerciseIndex: number) {
  //   this.exercises().removeAt(exerciseIndex);
  // }

  // set logic

  setSets() {
    this.workout.exercises.forEach((exercise: any) => {
      const exerciseSets: ExerciseSets = { exerciseName: exercise.exerciseName, setList: [], reps: exercise.reps };
      for (let i = 0; i < exercise.sets; i++) {
        exerciseSets.setList.push({ reps: exercise.reps, isFail: false, isFinished: false });
      }
      this.exerciseList.push(exerciseSets);
    });
  }

  // exercises(dayIndex: number): FormArray {
  //   return this.days(dayIndex)
  //     .at(dayIndex)
  //     .get('exercises') as FormArray;
  // }

  newExercise(): FormGroup {
    return this.fb.group({
      exerciseName: '',
      sets: 1,
      reps: 1,

    });
  }

  // addExercise(dayIndex: number) {
  //   this.exercises(dayIndex).push(this.newExercise());
  // }

  // removeExercise(dayIndex: number, skillIndex: number) {
  //   this.exercises(dayIndex).removeAt(skillIndex);
  // }
}



