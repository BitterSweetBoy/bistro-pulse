import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { LocationPickerComponent } from '../../../shared/components/location-picker/location-picker.component';
import { SocialMediaProfilesComponent } from '../../../shared/components/social-media-profiles/social-media-profiles.component';
import { ImagesRestaurantUploaderComponent } from '../../../shared/components/images-uploader-restaurant/images-restaurant-uploader.component';

@Component({
  selector: 'app-basic-info-restaurant',
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, KeyFilterModule, TextareaModule, SelectModule, FormsModule, LocationPickerComponent, SocialMediaProfilesComponent, ImagesRestaurantUploaderComponent],
  templateUrl: './basic-info-restaurant.component.html',
  styleUrl: './basic-info-restaurant.component.scss'
})
export class BasicInfoRestaurantComponent {

  @Input() infoGroup!: FormGroup;
  maxImages:number = 6;

  cuisineTypes = [
    { label: 'Internacional', value: 'internacional' },
    { label: 'Italiana', value: 'italiana' },
    { label: 'Mexicana', value: 'mexicana' },
    { label: 'China', value: 'china' },
    { label: 'Mariscos', value: 'mariscos' },
    { label: 'Parrilla', value: 'parrilla' },
    { label: 'Vegetariana', value: 'vegetariana' },
    { label: 'Comida Rápida', value: 'comida-rapida' }
  ];

  get locationFormGroup(): FormGroup {
    return this.infoGroup.get('location') as FormGroup;
  }

  get socialGroup(): FormGroup {
    return this.infoGroup.get('socialMedias') as FormGroup;
  }

  get imagesGroup(): FormGroup {
    return this.infoGroup.get('images') as FormGroup;
  }

}
