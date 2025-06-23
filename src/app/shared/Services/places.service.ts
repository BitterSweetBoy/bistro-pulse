import { Injectable, signal, WritableSignal } from '@angular/core';
import { PlaceDetails, PlaceResult } from '../interfaces/places.interface';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  readonly places: WritableSignal<PlaceResult[]> = signal<PlaceResult[]>([]);

  async findPlaces(text: string) {
    if (!text) {
      this.places.set([]);
      return;
    }
    const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
    const request = {
      textQuery: text,
      fields: ['displayName'],
      locationBias: { lat: 14.0723, lng: -87.1921 },
      language: 'es',
    };
    const { places } = await Place.searchByText(request);
    const mapped: PlaceResult[] = places.map(r => ({
      id: r.id!,
      displayName: r.displayName!,

    }));
    this.places.set(mapped);
  }

  async getPlaceDetails(placeId: string): Promise<PlaceDetails|null> {
    const { Place } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
    const inst = new Place({ id: placeId });
    await inst.fetchFields({ fields: ['location', 'displayName', 'formattedAddress', ] });
    if (!inst.location) return null;
    return {
      id: placeId,
      displayName: inst.displayName!,
      formattedAddress: inst.formattedAddress!,
      location: {
        lat: inst.location.lat(),
        lng: inst.location.lng()
      }
    };
  }
  
}