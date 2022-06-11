import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { APIClientService } from '../api-client.service';
import { User } from '../interfaces';
import { UserService } from '../user.service';


@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.css']
})
export class CreateRoutineComponent implements OnInit {


  user: User | null = null;
  subscription: Subscription | undefined;



  public firstFormGroup = this.fb.group({
    routineName: '',
  });



  routineForm: FormGroup = this.fb.group({
    days: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder,
    private http: APIClientService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.subscription = this.userService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  days(): FormArray {
    return this.routineForm.get('days') as FormArray;
  }

  newDay(): FormGroup {
    return this.fb.group({
      dayName: '',
      exercises: this.fb.array([])
    });
  }

  addDay() {
    this.days().push(this.newDay());
  }

  removeDay(dayIndex: number) {
    this.days().removeAt(dayIndex);
  }

  exercises(dayIndex: number): FormArray {
    return this.days()
      .at(dayIndex)
      .get('exercises') as FormArray;
  }

  newExercise(): FormGroup {
    return this.fb.group({
      exerciseName: '',
      sets: 0,
      reps: 0,

    });
  }

  addExercise(dayIndex: number) {
    this.exercises(dayIndex).push(this.newExercise());
  }

  removeExercise(dayIndex: number, skillIndex: number) {
    this.exercises(dayIndex).removeAt(skillIndex);
  }

  onSubmit() {
    const newRoutine = {
      name: this.firstFormGroup.value.routineName,
      days: this.routineForm.value.days,
    };
    console.log('newRoutine :>> ', newRoutine);
    console.log('this.firstFormGroup.value :>> ', this.firstFormGroup.value);
    console.log(this.routineForm.value);
  }

}


