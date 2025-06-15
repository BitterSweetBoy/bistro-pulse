import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverUploaderComponent } from './cover-uploader.component';

describe('CoverUploaderComponent', () => {
  let component: CoverUploaderComponent;
  let fixture: ComponentFixture<CoverUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoverUploaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
