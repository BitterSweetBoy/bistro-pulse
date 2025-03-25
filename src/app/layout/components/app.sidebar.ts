import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppMenu } from "./app.menu";
import { NavigationService } from '../services/navigation.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AuthService } from '../../shared/Services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, AppMenu, OverlayPanelModule],
  template: `
    <aside [ngClass]="navService.toggleSidebar() ? 'w-52' : 'w-16'" class="h-screen transition-all duration-300 relative">
      <nav class="h-full flex flex-col bg-white shadow-sm">
        <div class="p-4 flex justify-center items-center ">
          <img
            src="https://imagenes-libreria.s3.us-east-2.amazonaws.com/img/bisto-pulse.svg"
            alt="BistroPulse"
            class="overflow-hidden transition-all"
            [ngClass]="navService.toggleSidebar() ? 'mr-4' : ''"
          />
          <span *ngIf="navService.toggleSidebar()" class="text-primary font-bold text-xl">BistroPulse</span>
          
        </div>
        
        <div class="flex-1 overflow-y-auto">
          <ul class="px-3">
            <app-menu></app-menu>
          </ul>
        </div>

        <!-- Tu componente HTML -->
        <div class="flex p-3 items-center" (click)="op.toggle($event)">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="User Avatar"
            class="w-10 h-10 rounded-md"
          />
          <div [ngClass]="navService.toggleSidebar() ? 'w-52 ml-3' : 'w-0 opacity-0'"
              class="overflow-hidden transition-all">
            <h4 class="font-semibold">John Doe</h4>
            <span class="text-xs text-gray-600">johndoe&#64;gmail.com</span>
          </div>
        </div>

        <p-overlayPanel #op>
          <div class="p-3">
            <button type="button" pButton label="Cerrar sesión" icon="pi pi-power-off" (click)="onLogout()"></button>
          </div>
        </p-overlayPanel>

        <!-- <div class="flex p-3 items-center ">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="User Avatar"
            class="w-10 h-10 rounded-md"
          />
          <div [ngClass]="navService.toggleSidebar() ? 'w-52 ml-3' : 'w-0 opacity-0'" class="overflow-hidden transition-all">
            <h4 class="font-semibold">John Doe</h4>
            <span class="text-xs text-gray-600">johndoe&#64;gmail.com</span>
          </div>
        </div> -->
      </nav>
      <div class="absolute top-18 -right-4 transform -translate-y-1/2 flex items-center justify-center">
        <button (click)="toggleSidebar()" class="w-8 h-8 bg-white shadow-md rounded-xl border border-gray-300 transition-all">
          <i class="pi" [ngClass]="navService.toggleSidebar() ? 'pi-angle-left' : 'pi-angle-right'"></i>
        </button>
      </div>
    </aside>
  `,
 
  styles: [
    `.rotate-180 { transform: rotate(180deg); }`
  ],
})
export class AppSidebar {
  navService = inject(NavigationService);

  authService = inject(AuthService);

  constructor(private router: Router) {}

  onLogout() {
    this.authService.logout().subscribe(
      (response) => {
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.error('Error en logout', error);
      }
    );
  }

  toggleSidebar() {
    this.navService.toggleSidebar.update(value => !value);
  }
}
