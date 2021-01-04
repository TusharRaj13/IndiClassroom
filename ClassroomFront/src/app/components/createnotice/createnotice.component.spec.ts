import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenoticeComponent } from './createnotice.component';

describe('CreatenoticeComponent', () => {
  let component: CreatenoticeComponent;
  let fixture: ComponentFixture<CreatenoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatenoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
