import { Component, computed, effect, forwardRef, input, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { GalleryImages } from '../../interfaces/restaurantInterface';
import { CommonModule } from '@angular/common';
import { GalleryItem } from '../../interfaces/restaurantInterface';

@Component({
  selector: 'app-gallery-uploader',
  imports: [CommonModule],
  templateUrl: './gallery-uploader.component.html',
  styleUrl: './gallery-uploader.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GalleryUploaderComponent),
    multi: true
  }]
})
export class GalleryUploaderComponent {
  maxItems = input<number>(6);
  initialUrls = input<string[]>([]);

  private items = signal<GalleryItem[]>([]);
  private removedUrls = signal<string[]>([]);
  private currentValue: GalleryImages = { keepUrls: [], newFiles: [], removedUrls: [] };
  private onChange = (value: GalleryImages) => {};
  private onTouched = () => {};

  galleryItems = computed(() => this.items());
  canAddMore = computed(() => this.items().length < Math.min(this.maxItems(), 6));

  displaySlots = computed(() => {
    const items = this.items();
    const totalSlots = Math.min(this.maxItems(), 6);
    const slots: { index: number; item: GalleryItem | null }[] = [];
    
    for (let i = 0; i < totalSlots; i++) {
      slots.push({
        index: i,
        item: items[i] || null
      });
    }
    
    return slots;
  });

  constructor() {
    effect(() => {
      const urls = this.initialUrls();
      if (urls.length > 0 && this.items().length === 0) {
        this.initializeWithUrls(urls);
      }
    });
  }

  private initializeWithUrls(urls: string[]): void {
    const initialItems: GalleryItem[] = urls.map((url, index) => ({
      id: `initial-${index}`,
      type: 'url',
      src: url,
      originalUrl: url
    }));
    this.items.set(initialItems);
    this.emitChanges();
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    
    if (!files) return;

    const currentItems = this.items();
    const availableSlots = Math.min(this.maxItems(), 6) - currentItems.length;
    const filesToAdd = Array.from(files).slice(0, availableSlots);

    const newItems: GalleryItem[] = filesToAdd.map((file, index) => {
      const id = `file-${Date.now()}-${index}`;
      return {
        id,
        type: 'file',
        src: URL.createObjectURL(file),
        file
      };
    });

    this.items.set([...currentItems, ...newItems]);
    this.emitChanges();
    this.onTouched();

    input.value = '';
  }

  removeItem(itemId: string): void {
    const currentItems = this.items();
    const itemToRemove = currentItems.find(item => item.id === itemId);
    
    if (!itemToRemove) return;

    if (itemToRemove.type === 'url' && itemToRemove.originalUrl) {
      this.removedUrls.set([...this.removedUrls(), itemToRemove.originalUrl]);
    }

    if (itemToRemove.type === 'file' && itemToRemove.src.startsWith('blob:')) {
      URL.revokeObjectURL(itemToRemove.src);
    }

    const filteredItems = currentItems.filter(item => item.id !== itemId);
    this.items.set(filteredItems);
    this.emitChanges();
    this.onTouched();
  }

  private emitChanges(): void {
    const currentItems = this.items();
    
    const keepUrls = currentItems
      .filter(item => item.type === 'url' && item.originalUrl)
      .map(item => item.originalUrl!);

    const newFiles = currentItems
      .filter(item => item.type === 'file' && item.file)
      .map(item => item.file!);

    const result: GalleryImages = {
      keepUrls,
      newFiles,
      removedUrls: this.removedUrls()
    };

    this.currentValue = result;
    this.onChange(result);
  }

  // ControlValueAccessor
  writeValue(value: GalleryImages | null): void {
    if (!value) {
      this.currentValue = { keepUrls: [], newFiles: [], removedUrls: [] };
      this.items.set([]);
      this.removedUrls.set([]);
      return;
    }

    this.currentValue = value;

    // Reconstruir items basado en el valor recibido
    const items: GalleryItem[] = [];

    // Agregar URLs que se mantienen
    value.keepUrls.forEach((url, index) => {
      items.push({
        id: `keep-${index}`,
        type: 'url',
        src: url,
        originalUrl: url
      });
    });

    // Agregar archivos nuevos
    value.newFiles.forEach((file, index) => {
      items.push({
        id: `file-${index}`,
        type: 'file',
        src: URL.createObjectURL(file),
        file
      });
    });

    this.items.set(items);
    this.removedUrls.set(value.removedUrls);
  }

  registerOnChange(fn: (value: GalleryImages) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implementar si necesitas manejar estado deshabilitado
  }

  ngOnDestroy(): void {
    this.items().forEach(item => {
      if (item.type === 'file' && item.src.startsWith('blob:')) {
        URL.revokeObjectURL(item.src);
      }
    });
  }
}
