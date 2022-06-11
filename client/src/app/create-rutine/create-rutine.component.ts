import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-rutine',
  templateUrl: './create-rutine.component.html',
  styleUrls: ['./create-rutine.component.css']
})
export class CreateRutineComponent implements OnInit {
  isLinear = false;

  public rutine: any = {};

  public firstFormGroup = this.fb.group({

  });


  public secondFormGroup = this.fb.group({

  });


  rutineForm: FormGroup = this.fb.group({
    days: this.fb.array([])
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  }

  days(): FormArray {
    return this.rutineForm.get('days') as FormArray;
  }

  newDay(): FormGroup {
    return this.fb.group({
      firstName: '',
      lastName: '',
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

    });
  }

  addExercise(dayIndex: number) {
    this.exercises(dayIndex).push(this.newExercise());
  }

  removeExercise(dayIndex: number, skillIndex: number) {
    this.exercises(dayIndex).removeAt(skillIndex);
  }

  onSubmit() {
    console.log(this.rutineForm.value);
  }

}


