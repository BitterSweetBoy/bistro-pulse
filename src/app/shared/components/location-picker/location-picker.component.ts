import { Component, computed, effect, ElementRef, inject, Input, NgZone, signal, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { PlaceResult } from '../../interfaces/places.interface';
import { PlacesService } from '../../services/places.service';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';


@Component({
  selector: 'app-location-picker',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, GoogleMap, MapAdvancedMarker, InputTextModule, AutoCompleteModule],
  templateUrl: './location-picker.component.html',
  styleUrl: './location-picker.component.scss'
})
export class LocationPickerComponent {
  @Input() locationFormGroup!: FormGroup;

  private placeSearch = inject(PlacesService);

  markerPosition = signal<{ lat: number; lng: number }>({ lat: 14.0723, lng: -87.1921 });
  allowDrag = signal<boolean>(false); 
  readonly suggestions = computed(() => this.placeSearch.places());

  constructor() {
    effect(() => {
      const lat = this.locationFormGroup.get('lat')?.value;
      const lng = this.locationFormGroup.get('lng')?.value;
      if (lat != null && lng != null) {
        this.markerPosition.set({ lat, lng });
        this.zoom = 16;
      }
    });
  }

  zoom = 8;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 20,
    minZoom: 4,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    disableDefaultUI: true
  };

  advancedMarkerOptions: google.maps.marker.AdvancedMarkerElementOptions = {
    gmpDraggable: true
  };

  searchByText(event: { originalEvent: Event; query: string }) {
    const text = event.query.trim();
    if (text) {
      this.placeSearch.findPlaces(text);
    } else {
      this.placeSearch.places.set([]);
    }
  }

  async onSelect(place: PlaceResult) {
    const placeId = place.id;
    const result = await this.placeSearch.getPlaceDetails(placeId);
    if (!result) return;
    this.locationFormGroup.patchValue({
      address: result.formattedAddress,
      lat: result.location.lat,
      lng: result.location.lng
    });

    this.markerPosition.set({
      lat: result.location.lat,
      lng: result.location.lng
    });
    this.zoom = 16;
    this.placeSearch.places.set([]);
  }

  onMarkerDragEnd(event: google.maps.MapMouseEvent){
    if (!this.allowDrag()) return;
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    if (lat != null && lng != null) {
      this.locationFormGroup.patchValue({ lat, lng });
      this.markerPosition.set({ lat, lng });
    } 
  }

  enableDrag() {
    this.allowDrag.set(true);
  }
}