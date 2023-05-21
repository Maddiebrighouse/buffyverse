export interface Character {
  id: number;
  name: string;
  age: number;
  alias?: string | string[];
  species?: string;
  imageUrl?: string;
  occupation?: string;
}

interface Episode {
  name: string;
  season: number;
  episode: number;
  characters: Character[];
  mainLocation: Location;
  url: string;
  description: string;
}
