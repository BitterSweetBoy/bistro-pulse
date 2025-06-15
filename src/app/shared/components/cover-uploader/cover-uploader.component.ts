import { Component, effect, forwardRef, input, Input, output, Output, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { extractFile } from '../../helpers/image-utils';
import { CommonModule } from '@angular/common';
import { CoverImage } from '../../interfaces/restaurantInterface';

@Component({
  selector: 'app-cover-uploader',
  imports: [CommonModule],
  templateUrl: './cover-uploader.component.html',
  styleUrl: './cover-uploader.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CoverUploaderComponent),
    multi: true
  }]
})
export class CoverUploaderComponent {
  placeholder = input<string>('+ Foto de Portada');
  hint = input<string>('Tamaño recomendado: 1280 × 720 px');
  initialUrl = input<string | null>(null);

  preview = signal<string | null>(null);
  
  private file: File | null = null;
  private removed = false;
  private currentValue: CoverImage = { keepUrl: null, newFile: null, removedUrl: null };
  private onChange = (value: CoverImage) => {};
  private onTouched = () => {};

  constructor() {
    // Usar effect para reaccionar a cambios en initialUrl
    effect(() => {
      const initial = this.initialUrl();
      if (initial && initial.trim() !== '' && !this.preview()) {
        this.preview.set(initial);
      }
    });
  }

  hasPreview() {
    const previewValue = this.preview();
    return previewValue && previewValue.trim() !== '';
  }

  onSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {
      this.file = file;
      this.removed = false;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        this.preview.set(result);
      };
      reader.readAsDataURL(file);
      
      this.emitChanges();
      this.onTouched();
    }
  }

  private emitChanges(): void {
    const coverImage: CoverImage = {
      keepUrl: this.shouldKeepUrl() ? this.initialUrl() : null,
      newFile: this.file,
      removedUrl: this.shouldRemoveUrl() ? this.initialUrl() : null
    };
    
    this.currentValue = coverImage;
    this.onChange(coverImage);
  }

  private shouldKeepUrl(): boolean {
    return !this.file && !this.removed && !!this.initialUrl();
  }

  private shouldRemoveUrl(): boolean {
    return !!this.initialUrl() && (this.removed || !!this.file);
  }

  writeValue(value: CoverImage | null): void {
    if (!value) {
      this.currentValue = { keepUrl: null, newFile: null, removedUrl: null };
      this.preview.set(this.initialUrl());
      this.file = null;
      this.removed = false;
      return;
    }

    this.currentValue = value;

    // Si hay un archivo nuevo
    if (value.newFile) {
      this.file = value.newFile;
      this.removed = false;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.preview.set(e.target?.result as string);
      };
      reader.readAsDataURL(value.newFile);
    }
    // Si hay una URL a mantener
    else if (value.keepUrl) {
      this.preview.set(value.keepUrl);
      this.file = null;
      this.removed = false;
    }
    // Si hay una URL removida
    else if (value.removedUrl) {
      this.preview.set(null);
      this.file = null;
      this.removed = true;
    }
    // Estado inicial
    else {
      this.preview.set(this.initialUrl());
      this.file = null;
      this.removed = false;
    }
  }

  registerOnChange(fn: (value: CoverImage) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }
}
