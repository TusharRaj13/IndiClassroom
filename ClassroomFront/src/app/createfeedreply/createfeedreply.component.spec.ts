import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatefeedreplyComponent } from './createfeedreply.component';

describe('CreatefeedreplyComponent', () => {
  let component: CreatefeedreplyComponent;
  let fixture: ComponentFixture<CreatefeedreplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatefeedreplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatefeedreplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
