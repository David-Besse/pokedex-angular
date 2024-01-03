import { Pipe, PipeTransform } from '@angular/core';

const colors: { [key: string]: string } = {
  Feu: '#e72324',
  Eau: '#2481ef',
  Plante: '#3da224',
  Insecte: '#92a212',
  Normal: '#808080',
  Vol: '#82baef',
  Poison: '#923fcc',
  Fée: '#ffc0cb',
  Psy: '#ef3f7a',
  Electrik: '#fac100',
  Combat: '#ff8100',
  Sol: '#92501b',
  Roche: '#b0aa82',
  Glace: '#3dd9ff',
  Dragon: '#4f60e2',
  Ténèbres: '#4e3e3c',
  Spectre: '#703f70',
  Acier: '#60a2b9',
};

@Pipe({ name: 'pokemonTypeColor', standalone: true })
export class PokemonTypeColorPipe implements PipeTransform {
  transform(type: string): string {
    return colors[type] || '#a0a2a0';
  }
}
