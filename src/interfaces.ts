interface Location {
  name: string;
  type: "Earth" | "Hell" | "Heaven" | "Demon-Dimension" | "Past";
}

export interface Character {
  id: number;
  name: string;
  alias?: string | string[];
  catchPhrase?: string[];
  urlImage?: string;
  occupation?: string;
  affiliation?: string[];
  species?: string;
  birthplace?: string;
  birthdate?: string;
  nationality?: string;
  abilities?: string[];
  equipment?: string[];
  relationships?: [
    { name: string; relationship_type: string; status?: string }
  ];
  appearance?: {
    hair_color: string;
    eye_color: string;
    height: string;
    weight: string;
    distinctive_features: string;
  };
  personality?: {
    traits: string[];
    likes: string[];
    dislikes: string[];
    strengths: string[];
    weaknesses: string[];
  };
  backstory?: string;
  notes?: string;
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
