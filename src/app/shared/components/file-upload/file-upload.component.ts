import { Component, ElementRef, forwardRef, inject, Input, ViewChild,} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-file-upload',
  imports: [ButtonModule, ToastModule, CommonModule, InputTextModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
    MessageService,
  ],
})
export class FileUploadComponent {
  @Input() acceptedTypes: string = '*';
  @Input() placeholder: string = 'Sin Archivos Seleccionados';
  @Input() maxFileSize: number = 2 * 1024 * 1024;
  @Input() allowedExtensions: string[] = [];
  @Input() maxFiles: number = 1;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedFiles: File[] = [];
  disabled = false;

  private onChange = (files: File[]) => {};
  onTouched = () => {};

  private messageService = inject(MessageService);

  /** ControlValueAccessor */
  writeValue(files: File[] | null): void {
    this.selectedFiles = files ?? [];
  }
  registerOnChange(fn: (files: File[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /** CLICK en contenedor: abre diálogo sólo si caben más */
  onContainerClick(): void {
    if (!this.disabled && this.selectedFiles.length < this.maxFiles) {
      this.fileInput.nativeElement.click();
    }
  }

  /** Al seleccionar archivo(s) */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    Array.from(input.files).forEach((file) => this.processFile(file));

    // limpia el input para permitir volver a subir mismo nombre si se elimina
    input.value = '';
    this.emitChange();
  }

  /** Validación y acumulación */
  private processFile(file: File): void {
    if (this.selectedFiles.length >= this.maxFiles) {
      return;
    }

    // tamaño
    if (file.size > this.maxFileSize) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `El archivo excede ${this.formatFileSize(this.maxFileSize)}`,
      });
      return;
    }

    // extensión
    if (
      this.allowedExtensions.length > 0 &&
      !this.allowedExtensions.includes(
        file.name.split('.').pop()?.toLowerCase()!
      )
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Solo ${this.allowedExtensions.join(', ')} son permitidos`,
      });
      return;
    }

    this.selectedFiles.push(file);
    this.messageService.add({
      severity: 'success',
      summary: 'Correcto',
      detail: 'Archivo cargado correctamente',
    });
  }

  /** Elimina uno */
  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.emitChange();
  }

  /** Emitir al form */
  private emitChange() {
    this.onChange(this.selectedFiles);
    this.onTouched();
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
  }

  trackByIndex(index: number): number {
    return index;
  }
}
