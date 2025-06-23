import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoRestaurantComponent } from './basic-info-restaurant.component';

describe('BasicInfoRestaurantComponent', () => {
  let component: BasicInfoRestaurantComponent;
  let fixture: ComponentFixture<BasicInfoRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicInfoRestaurantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicInfoRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
