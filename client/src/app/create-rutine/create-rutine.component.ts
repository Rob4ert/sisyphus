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

  public firstFormGroup = this.formBuilder.group({
    rutineName: [],
    days: this.formBuilder.array([this.addDaysGroup()])
  });


  public secondFormGroup = this.formBuilder.group({
    exercises: this.formBuilder.array([this.addExercisesGroup()])
  });


  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
  }


  private addDaysGroup(): FormGroup {
    return this.formBuilder.group({
      dayName: [],
      // exercises: this.formBuilder.array([])
    });
  }

  private addExercisesGroup(): FormGroup {
    return this.formBuilder.group({
      exerciseName: [],
      // reps: ['1313', [Validators.maxLength(10)]],
    });
  }


  addDay() {
    this.daysArray.push(this.addDaysGroup());
  }

  addExercise() {
    this.exercisesArray.push(this.addExercisesGroup());
  }

  deleteDay(dayIndex: number) {
    this.daysArray.removeAt(dayIndex);
  }

  deleteExercise(dayIndex: number) {
    this.exercisesArray.removeAt(dayIndex);
  }


  get daysArray(): FormArray {
    return <FormArray>this.firstFormGroup.get('days');
  }
  get exercisesArray(): FormArray {
    return <FormArray>this.secondFormGroup.get('exercises');
  }


  check() {
    this.rutine = this.firstFormGroup.value;
    console.log('daysArray.value :>> ', this.rutine);
  }


  // getControls(day: any): any {
  //   console.log('object :>> ', (day.get('exercises') as FormArray));
  //   return (day.get('exercises') as FormArray).controls;
  // }

  // addExercise(index: number): void {
  //   console.log('daysArray :>> ', this.daysArray);

  //   (<FormArray>(<FormGroup>this.daysArray.at(index)).get('exercises')).push(this.exercisesGroup());
  // }



}


