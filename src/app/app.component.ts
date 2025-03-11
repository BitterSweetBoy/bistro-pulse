import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLayout } from "./layout/components/app.layout";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppLayout],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bistro-pulse';
}
