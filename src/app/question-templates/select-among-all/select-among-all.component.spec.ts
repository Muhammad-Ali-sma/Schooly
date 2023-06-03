import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAmongAllComponent } from './select-among-all.component';

describe('SelectAmongAllComponent', () => {
  let component: SelectAmongAllComponent;
  let fixture: ComponentFixture<SelectAmongAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAmongAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAmongAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
