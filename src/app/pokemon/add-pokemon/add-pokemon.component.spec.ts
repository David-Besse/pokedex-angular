import AddPokemonComponent from './add-pokemon.component';
import { Pokemon } from '../pokemon';

describe('AddPokemonComponent', () => {
  let component: AddPokemonComponent;

  beforeEach(() => {
    component = new AddPokemonComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pokemon', () => {
    component.ngOnInit();
    expect(component.pokemon instanceof Pokemon).toBeTruthy();
  });
});
