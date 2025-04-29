import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMarkAsDirtyOnBlur]'
})
export class MarkAsDirtyOnBlurDirective {

  constructor(private ngControl: NgControl) { }

  @HostListener('blur')
  onBlur() {
    this.ngControl.control?.markAsDirty();
  }

}
