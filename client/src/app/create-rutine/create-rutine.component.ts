import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-rutine',
  templateUrl: './create-rutine.component.html',
  styleUrls: ['./create-rutine.component.css']
})
export class CreateRutineComponent implements OnInit {


  public userForm: FormGroup;
  // this.formBuilder.group({

  //   days:this.formBuilder.array([this.addDaysGroup()])
  // });

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });


  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      Name: [],
      days: this.formBuilder.array([this.addDaysGroup()])
    });

  }
  ngOnInit(): void {
  }


  private addDaysGroup(): FormGroup {
    return this.formBuilder.group({
      dayName: [],
      exercises: this.formBuilder.array([])
    });
  }

  private exercisesGroup(): FormGroup {
    return this.formBuilder.group({
      exerciseName: [],
      // reps: ['1313', [Validators.maxLength(10)]],
    });
  }


  addDay() {
    this.daysArray.push(this.addDaysGroup());

  }
  deleteDay(dayIndex: number) {
    this.daysArray.removeAt(dayIndex);
  }

  get daysArray(): FormArray {
    return <FormArray>this.userForm.get('days');
  }

  addExercise(index: number): void {
    console.log('daysArray() :>> ', this.daysArray);
    console.log('this.daysArray.controls[index]).controls :>> ', (<FormGroup>this.daysArray.controls[index]).get('exercises'));
    (<FormArray>(<FormGroup>this.daysArray.at(index)).get('exercises')).push(this.exercisesGroup());
  }



}


