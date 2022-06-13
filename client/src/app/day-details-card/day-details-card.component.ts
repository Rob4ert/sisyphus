import { Component, Input, OnInit } from '@angular/core';
import { Day } from '../interfaces';

@Component({
  selector: 'app-day-details-card',
  templateUrl: './day-details-card.component.html',
  styleUrls: ['./day-details-card.component.css']
})
export class DayDetailsCardComponent implements OnInit {

  displayedColumns: string[] = ['name', 'sets', 'reps'];
  @Input()
  routineDay!: Day;
  constructor() { }

  ngOnInit(): void {

  }

}
