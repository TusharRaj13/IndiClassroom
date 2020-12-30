import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinclassroomComponent } from './joinclassroom.component';

describe('JoinclassroomComponent', () => {
  let component: JoinclassroomComponent;
  let fixture: ComponentFixture<JoinclassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinclassroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinclassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
