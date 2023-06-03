import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceTextOrImageSelectComponent } from './multiple-choice-text-or-image-select.component';

describe('MultipleChoiceTextOrImageSelectComponent', () => {
  let component: MultipleChoiceTextOrImageSelectComponent;
  let fixture: ComponentFixture<MultipleChoiceTextOrImageSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleChoiceTextOrImageSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceTextOrImageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
