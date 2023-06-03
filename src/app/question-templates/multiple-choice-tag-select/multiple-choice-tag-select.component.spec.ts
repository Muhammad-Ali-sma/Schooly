import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceTagSelectComponent } from './multiple-choice-tag-select.component';

describe('MultipleChoiceTagSelectComponent', () => {
  let component: MultipleChoiceTagSelectComponent;
  let fixture: ComponentFixture<MultipleChoiceTagSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleChoiceTagSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceTagSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
