export class Pokemon {
  id: number;
  name: string;
  hp: number;
  cp: number;
  picture: string;
  types: string[];
  created: string;

  constructor(
    name: string = '...',
    hp: number = 0,
    cp: number = 0,
    picture: string = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/xxx.png',
    types: string[] = ['Normal'],
    created: string = new Date().toString()
  ) {
    this.name = name;
    this.hp = hp;
    this.cp = cp;
    this.picture = picture;
    this.types = types;
    this.created = created;
  }
}
