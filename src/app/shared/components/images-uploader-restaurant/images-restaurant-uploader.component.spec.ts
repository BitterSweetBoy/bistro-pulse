import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesUploaderRestaurantComponent } from './images-uploader-restaurant.component';

describe('ImagesUploaderRestaurantComponent', () => {
  let component: ImagesUploaderRestaurantComponent;
  let fixture: ComponentFixture<ImagesUploaderRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesUploaderRestaurantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesUploaderRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
