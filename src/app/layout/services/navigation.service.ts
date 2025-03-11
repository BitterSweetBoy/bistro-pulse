import { Injectable, Signal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavigationService {

  isSuperAdmin = signal(true); 
  currentRestaurant = signal<string | null>(null);
  toggleSidebar = signal(true);

  enterRestaurant(restaurantId: string) {
    this.isSuperAdmin.set(false);
    this.currentRestaurant.set(restaurantId);
  }

  exitRestaurant() {
    this.isSuperAdmin.set(true);
    this.currentRestaurant.set(null);
  }

  getToggleSidebar(){
    return this.toggleSidebar();
  }
  

}
