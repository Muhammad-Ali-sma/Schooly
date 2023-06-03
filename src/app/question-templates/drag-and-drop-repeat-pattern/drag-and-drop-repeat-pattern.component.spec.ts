import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropRepeatPatternComponent } from './drag-and-drop-repeat-pattern.component';

describe('DragAndDropRepeatPatternComponent', () => {
  let component: DragAndDropRepeatPatternComponent;
  let fixture: ComponentFixture<DragAndDropRepeatPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragAndDropRepeatPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropRepeatPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
