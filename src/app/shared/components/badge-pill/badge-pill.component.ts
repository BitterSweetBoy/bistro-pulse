import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge-pill',
  imports: [CommonModule],
  templateUrl: './badge-pill.component.html',
})
export class BadgePillComponent {
  @Input() label = '';
  @Input() variant: 'primary' | 'secondary' | 'neutral' = 'primary';
}
