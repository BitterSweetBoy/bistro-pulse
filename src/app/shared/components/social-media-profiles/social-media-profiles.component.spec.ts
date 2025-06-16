import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaProfilesComponent } from './social-media-profiles.component';

describe('SocialMediaProfilesComponent', () => {
  let component: SocialMediaProfilesComponent;
  let fixture: ComponentFixture<SocialMediaProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMediaProfilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMediaProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
