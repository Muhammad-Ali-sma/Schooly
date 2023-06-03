import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropIntoTagComponent } from './drag-and-drop-into-tag.component';

describe('DragAndDropIntoTagComponent', () => {
  let component: DragAndDropIntoTagComponent;
  let fixture: ComponentFixture<DragAndDropIntoTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragAndDropIntoTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropIntoTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
