import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Step } from '../../interfaces/utilsInterface';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent {
  @Input() steps: Step[] = [];
  @Input() currentIndex = 0;

  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}