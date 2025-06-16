import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoverUploaderComponent } from '../cover-uploader/cover-uploader.component';
import { GalleryUploaderComponent } from '../gallery-uploader/gallery-uploader.component';
import { InfoPanelComponent } from '../info-panel/info-panel.component';
import { BadgePillComponent } from '../badge-pill/badge-pill.component';

@Component({
  selector: 'app-image-restaurant-uploader',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, CoverUploaderComponent, GalleryUploaderComponent, InfoPanelComponent, BadgePillComponent],
  templateUrl: './images-restaurant-uploader.component.html',
  styleUrl: './images-restaurant-uploader.component.scss'
})
export class ImagesRestaurantUploaderComponent {
  @Input() imagesGroup!: FormGroup;
  @Input() maxItems = 6;

  get currentGalleryCount(): number {
    const g = this.imagesGroup.get('gallery')?.value;
    return (g?.keepUrls?.length ?? 0) + (g?.newFiles?.length ?? 0);
  }
}
