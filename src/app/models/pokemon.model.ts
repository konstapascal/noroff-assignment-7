export interface PokemonApiResponse {
  count: number;
  next: string;
  previous: string | null;
  results: Pokemon[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface FormattedPokemon {
  name: string;
  id: string;
  imageUrl: string;
}
