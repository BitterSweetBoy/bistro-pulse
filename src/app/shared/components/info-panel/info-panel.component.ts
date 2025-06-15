import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-panel',
  imports: [CommonModule],
  templateUrl: './info-panel.component.html',
  styleUrl: './info-panel.component.scss'
})
export class InfoPanelComponent {
  @Input() type: 'info' | 'tip' | 'warning' = 'info';

  get bgClass(): string {
    return {
      info: 'bg-blue-50',
      tip: 'bg-yellow-50',
      warning: 'bg-red-50',
    }[this.type];
  }

  get iconColorClass(): string {
    return {
      info: 'text-primary',
      tip: 'text-yellow-500',
      warning: 'text-red-500',
    }[this.type];
  }

  get iconClass(): string {
    return {
      info: 'pi pi-info-circle',
      tip: 'pi pi-lightbulb',
      warning: 'pi pi-ban',
    }[this.type];
  }
}
