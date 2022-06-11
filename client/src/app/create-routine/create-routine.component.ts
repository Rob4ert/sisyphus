import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.css']
})
export class CreateRoutineComponent implements OnInit {


  public routine: any = {};

  public firstFormGroup = this.fb.group({
    routineName: '',
  });



  routineForm: FormGroup = this.fb.group({
    days: this.fb.array([])
  });

  constructor(private fb: FormBuilder) { }

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
    console.log('this.firstFormGroup.value :>> ', this.firstFormGroup.value);
    console.log(this.routineForm.value);
  }

}


