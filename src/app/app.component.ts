import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root', // name of the component
  standalone: true, // this component can be used in other components
  imports: [CommonModule, RouterOutlet], // import other modules
  templateUrl: './app.component.html', // path to the template
  styleUrl: './app.component.scss' // path to the stylesheet
})

export class AppComponent {
  pokemons: string[] = ['bulbasaur', 'charmander', 'squirtle']; // name of the component
}
