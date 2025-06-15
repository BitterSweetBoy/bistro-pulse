export interface Representative {
  id: number;
  name: string;
  phone: string;
  avatar: string;
}

export interface PaymentMethod {
  label: string;
  value: string;
}

export interface CoverImage {
  keepUrl: string | null;
  newFile: File | null;
  removedUrl: string | null;
}

export interface GalleryImages {
  keepUrls: string[];
  newFiles: File[];
  removedUrls: string[];
}

export interface GalleryItem {
  id: string;
  type: 'url' | 'file';
  src: string;
  file?: File;
  originalUrl?: string;
}

export interface RestaurantFormDTO {
  restaurantName: string;
  representatives: Representative[];
  phoneNumber: string;
  established: string;
  startTime: string;
  endTime: string;
  paymentMethods: PaymentMethod[];
  location: string;
  images: {
    cover: CoverImage;
    gallery: GalleryImages;
  };
}
