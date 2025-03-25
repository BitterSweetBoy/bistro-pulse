import { Component, Input, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMenuItem } from './app.menuitem';
import { AvatarModule } from 'primeng/avatar';
import { NavigationService } from '../services/navigation.service';
import { NavigationInterface } from '../../shared/interfaces/NavigationInterface';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuItem, AvatarModule],
  template: `
    <ul *ngIf="navService.toggleSidebar" class="py-2">
      <ng-container *ngFor="let item of menuItems()">
        <app-menuitem [item]="item"></app-menuitem>
      </ng-container>
    </ul>
  `
})
export class AppMenu {
  navService = inject(NavigationService);

  @Input() expanded: boolean = true;

  private superAdminNavigation: NavigationInterface[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      roles: ['ADMIN', 'MANAGER', 'USER']
    },
    {
      label: 'Clientes',
      icon: 'profile',
      routerLink: ['/customers'],
      roles: ['ADMIN', 'MANAGER']
    },
    {
      label: 'Restaurantes',
      icon: 'restaurant-management',
      roles: ['ADMIN', 'MANAGER'],
      items: [
        {
          label: 'Lista de Restaurantes',
          icon: undefined,
          routerLink: ['/restaurants/list'],
          roles: ['ADMIN', 'MANAGER']
        },
        {
          label: 'Nuevo Restaurante',
          icon: undefined,
          routerLink: ['/restaurants/request'],
          roles: ['ADMIN']
        }
      ]
    },
    {
      label: 'Repartidores',
      icon: 'rider',
      routerLink: ['/riders'],
      roles: ['ADMIN', 'MANAGER']
    },
    {
      label: 'Ordenes',
      icon: 'order',
      roles: ['ADMIN', 'MANAGER', 'USER'],
      items: [
        {
          label: 'Ordenes',
          icon: undefined,
          routerLink: ['/orders/list'],
          roles: ['ADMIN', 'MANAGER', 'USER']
        },
        {
          label: 'Análisis',
          icon: undefined,
          routerLink: ['/orders/analytics'],
          roles: ['ADMIN', 'MANAGER']
        }
      ]
    },
    {
      label: 'Publicidad',
      icon: 'advertisement',
      roles: ['ADMIN'],
      items: [
        {
          label: 'Campañas',
          icon: undefined,
          routerLink: ['/ads/campaigns'],
          roles: ['ADMIN']
        },
        {
          label: 'Análisis',
          icon: undefined,
          routerLink: ['/ads/analytics'],
          roles: ['ADMIN']
        }
      ]
    },
    {
      label: 'Empleados',
      icon: 'users',
      routerLink: ['/employees'],
      roles: ['ADMIN']
    }
  ];

  private adminNavigation: NavigationInterface[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      routerLink: ['/dashboard'],
      roles: ['ADMIN', 'MANAGER', 'USER']
    },
    {
      label: 'Food Menu',
      icon: 'food-menu',
      routerLink: ['/food-menu'],
      roles: ['ADMIN', 'MANAGER']
    }
  ];

  menuItems = computed(() => 
    this.navService.isSuperAdmin() ? this.superAdminNavigation : this.adminNavigation
  );
}
