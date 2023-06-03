import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceVerticalAnswersComponent } from './multiple-choice-vertical-answers.component';

describe('MultipleChoiceVerticalAnswersComponent', () => {
  let component: MultipleChoiceVerticalAnswersComponent;
  let fixture: ComponentFixture<MultipleChoiceVerticalAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleChoiceVerticalAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceVerticalAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
