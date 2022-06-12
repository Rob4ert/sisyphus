import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { APIClientService } from '../api-client.service';
import { User } from '../interfaces';
import { NotificationsService } from '../notifications.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.css']
})
export class CreateRoutineComponent implements OnInit {

  displayedColumns: string[] = ['name', 'sets', 'reps'];

  public firstFormGroup = this.fb.group({
    routineName: '',
  });



  routineForm: FormGroup = this.fb.group({
    days: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder,
    private http: APIClientService,
    private notification: NotificationsService,
  ) { }

  ngOnInit() {
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
      sets: 1,
      reps: 1,

    });
  }

  addExercise(dayIndex: number) {
    this.exercises(dayIndex).push(this.newExercise());
  }

  removeExercise(dayIndex: number, skillIndex: number) {
    this.exercises(dayIndex).removeAt(skillIndex);
  }

  onSubmit() {
    const routine = {
      routineName: this.firstFormGroup.value.routineName,
      days: this.routineForm.value.days,
    };
    this.http.SaveRoutine(routine)
      .subscribe((res) => {
        this.notification.createNotification(`New Routine: ${res.routineName}, created!`);
      });
  }

}


