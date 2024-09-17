export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: Breed[];
  categories?: Category[]; 
}

interface Breed {
  id: string;
  name: string;
  description: string;
  wikipedia_url: string;
  hypoallergenic: number;
}

interface Category {
  id: number;
  name: string;
}

export interface Favorite {
  id: string;
  cat: Cat;
  userId: string;
}
