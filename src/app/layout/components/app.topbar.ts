// app.topbar.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-white text-white p-5 pb-[1.59em]">
      <h1 class="text-neutral-800 text-lg">Restaurant Management</h1>
    </header>
  `,
})
export class AppTopbar {}