import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineMenuComponent } from './routine-menu.component';

describe('RoutineMenuComponent', () => {
  let component: RoutineMenuComponent;
  let fixture: ComponentFixture<RoutineMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutineMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
