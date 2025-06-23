export interface PlaceResult {
  id: string;
  displayName: string;
}

export interface PlaceDetails{
  id: string;
  displayName: string;
  formattedAddress: string;
  location: {
    lat: number;
    lng: number;
  }; 
}
