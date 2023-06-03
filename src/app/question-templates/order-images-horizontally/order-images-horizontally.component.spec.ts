import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderImagesHorizontallyComponent } from './order-images-horizontally.component';

describe('OrderImagesHorizontallyComponent', () => {
  let component: OrderImagesHorizontallyComponent;
  let fixture: ComponentFixture<OrderImagesHorizontallyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderImagesHorizontallyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderImagesHorizontallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
