import { Component, forwardRef, Input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Nuevos tipos para emitir cambios detallados
type SingleImageChange = {
  keptUrl: string | null;
  newFile: File | null;
  removedUrl: string | null;
};

type MultipleImageChange = {
  keptUrls: string[];
  newFiles: File[];
  removedUrls: string[];
};

// El payload de salida usa uno u otro según 'multiple'
export type ImageChangePayload = SingleImageChange | MultipleImageChange;

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ImageUploaderComponent),
    multi: true
  }],
  templateUrl: './image-uploader.component.html',
})
export class ImageUploaderComponent implements ControlValueAccessor {
  @Input() multiple: boolean = false;
  @Input() placeHolderCover: string = '+ Foto de Portada';
  @Input() placeHolderText: string = '+';
  @Input() maxImages: number = 4;
  @Input() layout: 'default' | 'row' = 'default';
  @Input() itemsPerRow: number = 2;

  // Inputs para recibir cover inicial o galería
  @Input() initialCover: string | null = null;
  @Input() initialGallery: string[] = [];

  coverImage = signal<string | null>(null);
  secondaryImages = signal<string[]>([]);

  private files: File[] = [];
  private existingUrls: string[] = [];
  private removedUrls: string[] = [];
  private isDisabled = false;

  private onChange: (value: ImageChangePayload) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.resetState();
    if (this.multiple) {
      const initial = Array.isArray(value) ? value : this.initialGallery;
      this.setupGallery(initial);
    } else {
      const initial = value && typeof value !== 'object' ? value : this.initialCover;
      this.setupCover(initial as string | File | null);
    }
    this.emitChange();
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState?(isDisabled: boolean): void { this.isDisabled = isDisabled; }

  private resetState() {
    this.files = [];
    this.existingUrls = [];
    this.removedUrls = [];
    this.coverImage.set(null);
    this.secondaryImages.set([]);
  }

  private setupCover(value: string | File | null) {
    if (!value) return;
    if (typeof value === 'string') {
      this.existingUrls = [value];
      this.coverImage.set(value);
    } else {
      this.files = [value];
      this.coverImage.set(URL.createObjectURL(value));
    }
  }

  private setupGallery(arr: (string | File)[]) {
    if (!arr?.length) return;
    this.existingUrls = arr.filter(v => typeof v === 'string') as string[];
    this.files = arr.filter(v => v instanceof File) as File[];
    const previews = [...this.existingUrls, ...this.files.map(f => URL.createObjectURL(f))];
    this.secondaryImages.set(previews);
  }

  private emitChange() {
    if (this.multiple) {
      const payload: MultipleImageChange = {
        keptUrls: [...this.existingUrls],
        newFiles: [...this.files],
        removedUrls: [...this.removedUrls]
      };
      this.onChange(payload);
    } else {
      const payload: SingleImageChange = {
        keptUrl: this.existingUrls[0] ?? null,
        newFile: this.files[0] ?? null,
        removedUrl: this.removedUrls[0] ?? null
      };
      this.onChange(payload);
    }
    this.onTouched();
  }

  onCoverSelected(evt: Event) {
    if (this.isDisabled) return;
    const file = this.getFileFromEvent(evt);
    if (!file) return;

    // Capturamos la portada antigua antes de resetear
    const oldCover = this.coverImage();
    const hadExisting = oldCover != null && this.existingUrls.includes(oldCover);

    // Reiniciamos todo excepto removedUrls temporal
    this.resetState();
    if (hadExisting && oldCover) {
      this.removedUrls = [oldCover];
    }

    // Asignamos nuevo archivo como cover
    this.files = [file];
    const url = URL.createObjectURL(file);
    this.coverImage.set(url);
    this.emitChange();
  }

  onSecondarySelected(evt: Event) {
    if (this.isDisabled || !this.multiple) return;
    const file = this.getFileFromEvent(evt);
    if (!file || this.secondaryImages().length >= this.maxImages) return;

    this.files.push(file);
    const url = URL.createObjectURL(file);
    this.secondaryImages.update(prev => [...prev, url]);
    this.emitChange();
  }

  onSecondaryReplace(evt: Event, idx: number) {
    if (this.isDisabled || !this.multiple) return;
    const file = this.getFileFromEvent(evt);
    if (!file) return;

    const currentPreviews = this.secondaryImages();
    const oldUrl = currentPreviews[idx];
    // registramos la URL eliminada para el backend
    if (this.existingUrls.includes(oldUrl)) {
      this.removedUrls.push(oldUrl);
      this.existingUrls = this.existingUrls.filter(u => u !== oldUrl);
    }
    // ... reenlazamos archivos y previews como antes ...
    this.files.splice(idx, 0, file);
    const newUrl = URL.createObjectURL(file);
    this.secondaryImages.update(prev => Object.assign([...prev], { [idx]: newUrl }));
    this.emitChange();
  }

  removeSecondary(idx: number) {
    if (this.isDisabled || !this.multiple) return;

    const url = this.secondaryImages()[idx];
    if (this.existingUrls.includes(url)) {
      this.removedUrls.push(url);
      this.existingUrls = this.existingUrls.filter(u => u !== url);
    } else {
      // revocar y filtrar de files
      URL.revokeObjectURL(url);
      this.files = this.files.filter(f => URL.createObjectURL(f) !== url);
    }

    this.secondaryImages.set(this.secondaryImages().filter((_, i) => i !== idx));
    this.emitChange();
  }

  private getFileFromEvent(evt: Event): File | null {
    const input = evt.target as HTMLInputElement;
    if (!input.files?.length) return null;
    const f = input.files[0];
    input.value = '';
    return f;
  }
}