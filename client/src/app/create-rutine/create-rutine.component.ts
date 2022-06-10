import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-rutine',
  templateUrl: './create-rutine.component.html',
  styleUrls: ['./create-rutine.component.css']
})
export class CreateRutineComponent implements OnInit {


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) { }
  ngOnInit(): void {
  }

}
