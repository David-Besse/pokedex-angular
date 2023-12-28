import { Pipe, PipeTransform } from '@angular/core';

const colors: { [key: string]: string } = {
  Feu: 'bg-red-500',
  Eau: 'bg-blue-500',
  Plante: 'bg-green-500',
  Insecte: 'bg-amber-500',
  Normal: 'bg-gray-500',
  Vol: 'bg-sky-500',
  Poison: 'bg-indigo-500',
  Fée: 'bg-pink-500',
  Psy: 'bg-purple-500',
  Electrik: 'bg-lime-500',
  Combat: 'bg-orange-500',
};

@Pipe({ name: 'pokemonTypeColor', standalone: true })
export class PokemonTypeColorPipe implements PipeTransform {
  transform(type: string): string {
    return colors[type] || 'bg-gray-500';
  }
}
