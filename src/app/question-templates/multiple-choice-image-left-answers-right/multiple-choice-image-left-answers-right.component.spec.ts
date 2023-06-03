import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceImageLeftAnswersRightComponent } from './multiple-choice-image-left-answers-right.component';

describe('MultipleChoiceImageLeftAnswersRightComponent', () => {
  let component: MultipleChoiceImageLeftAnswersRightComponent;
  let fixture: ComponentFixture<MultipleChoiceImageLeftAnswersRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleChoiceImageLeftAnswersRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceImageLeftAnswersRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
