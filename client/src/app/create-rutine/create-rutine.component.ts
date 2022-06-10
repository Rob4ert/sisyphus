import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-rutine',
  templateUrl: './create-rutine.component.html',
  styleUrls: ['./create-rutine.component.css']
})
export class CreateRutineComponent implements OnInit {

  public form = this.formBuilder.group({

    days: this.formBuilder.array([])
  });

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private formBuilder: FormBuilder) { }
  ngOnInit(): void {
  }

  get days() {
    return this.form.controls["days"] as FormArray;
  }

  addDay() {
    const dayForm = this.formBuilder.group({
      day: ['', Validators.required],
      exercise: ['', Validators.required],

    });

    this.days.push(dayForm);
  }
  deleteDay(dayIndex: number) {
    this.days.removeAt(dayIndex);
  }


}
