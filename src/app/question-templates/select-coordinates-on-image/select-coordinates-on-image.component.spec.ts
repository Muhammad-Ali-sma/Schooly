import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCoordinatesOnImageComponent } from './select-coordinates-on-image.component';

describe('SelectCoordinatesOnImageComponent', () => {
  let component: SelectCoordinatesOnImageComponent;
  let fixture: ComponentFixture<SelectCoordinatesOnImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCoordinatesOnImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCoordinatesOnImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
