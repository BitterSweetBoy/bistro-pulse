import { Component } from '@angular/core';
import { AppSidebar } from './app.sidebar';
import { AppTopbar } from './app.topbar';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [AppSidebar, AppTopbar, RouterOutlet, CommonModule],
  template: `
    <div class="h-screen flex">
      <!-- Sidebar -->
      <app-sidebar></app-sidebar>

      <!-- Contenedor principal -->
      <div class="flex flex-col flex-1 transition-all duration-300 bg-neutral-200">
        
      <!-- Topbar -->
        <app-topbar></app-topbar>

        <!-- Contenido con padding y estilo de recuadro -->
        <div class="flex-1 p-6">
          <div class="h-full p-6 rounded-lg shadow-md" style="background-color: #fefefe;">
            <router-outlet></router-outlet>
          </div>
        </div>

      </div>
    </div>
  `,
})
export class AppLayout {
}
