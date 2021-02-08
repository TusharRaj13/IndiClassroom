import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listattendance2Component } from './listattendance2.component';

describe('Listattendance2Component', () => {
  let component: Listattendance2Component;
  let fixture: ComponentFixture<Listattendance2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Listattendance2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Listattendance2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
