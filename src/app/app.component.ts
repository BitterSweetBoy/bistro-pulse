import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AuthService } from './shared/Services/auth.service';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'bistro-pulse';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.verifySession().subscribe();
  }
}