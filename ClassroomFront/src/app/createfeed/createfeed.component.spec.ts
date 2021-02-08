import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatefeedComponent } from './createfeed.component';

describe('CreatefeedComponent', () => {
  let component: CreatefeedComponent;
  let fixture: ComponentFixture<CreatefeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatefeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatefeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
