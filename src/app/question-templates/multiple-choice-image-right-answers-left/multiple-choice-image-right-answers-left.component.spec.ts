import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceImageRightAnswersLeftComponent } from './multiple-choice-image-right-answers-left.component';

describe('MultipleChoiceImageRightAnswersLeftComponent', () => {
  let component: MultipleChoiceImageRightAnswersLeftComponent;
  let fixture: ComponentFixture<MultipleChoiceImageRightAnswersLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleChoiceImageRightAnswersLeftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceImageRightAnswersLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
