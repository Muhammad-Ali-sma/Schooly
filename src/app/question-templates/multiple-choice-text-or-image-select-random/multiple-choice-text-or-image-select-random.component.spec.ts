import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceTextOrImageSelectRandomComponent } from './multiple-choice-text-or-image-select-random.component';

describe('MultipleChoiceTextOrImageSelectRandomComponent', () => {
  let component: MultipleChoiceTextOrImageSelectRandomComponent;
  let fixture: ComponentFixture<MultipleChoiceTextOrImageSelectRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleChoiceTextOrImageSelectRandomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceTextOrImageSelectRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
