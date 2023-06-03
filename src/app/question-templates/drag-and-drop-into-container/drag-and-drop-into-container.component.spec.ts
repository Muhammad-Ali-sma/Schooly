import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropIntoContainerComponent } from './drag-and-drop-into-container.component';

describe('DragAndDropIntoContainerComponent', () => {
  let component: DragAndDropIntoContainerComponent;
  let fixture: ComponentFixture<DragAndDropIntoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragAndDropIntoContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropIntoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
