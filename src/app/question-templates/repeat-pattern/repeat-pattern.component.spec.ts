import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatPatternComponent } from './repeat-pattern.component';

describe('RepeatPatternComponent', () => {
  let component: RepeatPatternComponent;
  let fixture: ComponentFixture<RepeatPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepeatPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
