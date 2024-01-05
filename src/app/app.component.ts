import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './templates/app.component.html',
  styleUrl: './templates/app.component.scss',
  imports: [RouterOutlet],
})
export class AppComponent {}
