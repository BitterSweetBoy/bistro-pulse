import { Component } from '@angular/core';
import { AppSidebar } from './app.sidebar';
import { AppTopbar } from './app.topbar';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [AppSidebar,  RouterOutlet, AppTopbar, CommonModule],
  template: `
    <div class="h-screen flex">
      <!-- Sidebar -->
      <app-sidebar></app-sidebar>

      <!-- Contenedor principal -->
      <div class="flex flex-col flex-1 transition-all duration-300 bg-neutral-200">
        
      <!-- Topbar -->
        <app-topbar></app-topbar>

        <!-- Contenido con padding y estilo de recuadro -->
        <div class="flex-1 min-h-0 p-6 overflow-auto">
          <div class="p-6 rounded-2xl shadow-lg" style="background-color: #fefefe;">
            <router-outlet></router-outlet>
          </div>
        </div>

      </div>
    </div>
  `,
})
export class AppLayout {
}
