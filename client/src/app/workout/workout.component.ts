import { ExerciseSets, SetList } from './../interfaces';
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

  // subscriptions
  public user: any;
  public activeRoutine: any;

  // date variable
  public baseDate = new Date(Date.now());

  // exercise variables
  public workout: any;
  public exerciseList: ExerciseSets[] = [];



  // forms variables
  exercisesArray = new FormArray([]);
  public workoutForm: FormGroup = this.fb.group({
    exercises: this.exercisesArray
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
        this.setSets();
        this.createExercisesGroups();
      }
    });
  }


  // form methods


  createExercisesGroups() {
    this.exerciseList.forEach((exercise) => {
      this.exercisesArray.push(
        this.fb.group({
          exerciseName: exercise.exerciseName,
          reps: exercise.reps,
          sets: this.createSetsGroups(exercise)
        })
      );
    });
  }

  createSetsGroups(exercise: any) {
    const setsArray = new FormArray([
    ]);
    exercise.setList.forEach((set: SetList) => {
      setsArray.push(
        this.fb.group({
          reps: set.reps,
          weight: 0,
          isDone: set.isDone,
          isFail: set.isFail,
        })
      );
    });
    return setsArray;

  }

  exercises(): FormArray {
    return this.workoutForm.get('exercises') as FormArray;
  }

  sets(exerciseIndex: number): FormArray {
    return this.exercises()
      .at(exerciseIndex)
      .get('sets') as FormArray;
  }

  resetForm() {
    this.exercisesArray = new FormArray([]);
    this.createExercisesGroups();
  }

  // methods for organizing the information

  setSets() {
    this.workout.exercises.forEach((exercise: any) => {
      const exerciseSets: ExerciseSets = { exerciseName: exercise.exerciseName, setList: [], reps: exercise.reps };
      for (let i = 0; i < exercise.sets; i++) {
        exerciseSets.setList.push({ reps: exercise.reps, isFail: false, isFinished: false });
      }
      this.exerciseList.push(exerciseSets);
    });
  }

  setRoutineDay(routine: Routine) {
    routine.days.forEach((workout: Day) => {
      if (workout.weekDays.includes(this.baseDate.getDay())) {
        this.workout = workout;
      }
    });
  }

  // workout finish hanlder

  finishWorkout() {
    this.user.isDone = true;
    this.userService.updateUser(this.user);

  }

}



