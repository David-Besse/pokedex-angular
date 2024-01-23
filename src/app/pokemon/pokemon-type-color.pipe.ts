import { Pipe, PipeTransform } from '@angular/core';

const colors: { [key: string]: string } = {
  Feu: '#e72324',
  Eau: '#2481ef',
  Plante: '#3da224',
  Insecte: '#92a212',
  Normal: '#808080',
  Vol: '#82baef',
  Poison: '#B77FDC',
  Fée: '#ffc0cb',
  Psy: '#ef3f7a',
  Electrik: '#fac100',
  Combat: '#ff8100',
  Sol: '#D9813F',
  Roche: '#b0aa82',
  Glace: '#3dd9ff',
  Dragon: '#818EEE',
  Ténèbres: '#4e3e3c',
  Spectre: '#A15EA1',
  Acier: '#60a2b9',
};

@Pipe({ name: 'pokemonTypeColor', standalone: true })
export class PokemonTypeColorPipe implements PipeTransform {

  /**
   * A function that takes a type and returns a string.
   *
   * @param {string} type - the type parameter (ex: fire, water, etc.)
   * @return {string} the color corresponding to the type, or a default color
   */
  transform(type: string): string {
    return colors[type] || '#a0a2a0';
  }

}
