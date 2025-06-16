import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormArray } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-social-media-profiles',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, InputGroupModule, InputGroupAddonModule, ButtonModule],
  templateUrl: './social-media-profiles.component.html',
  styleUrl: './social-media-profiles.component.scss'
})
export class SocialMediaProfilesComponent {
  @Input() socialGroup!: FormGroup;

  get others(): FormArray {
    return this.socialGroup.get('others') as FormArray;
  }

  addOther() {
    // this.others.push(this.socialGroup.controls('').control);
  }

}
