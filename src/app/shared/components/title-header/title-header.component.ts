import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-header',
  imports: [],
  templateUrl: './title-header.component.html',
})
export class TitleHeaderComponent {
  @Input() title: string = '';
}
