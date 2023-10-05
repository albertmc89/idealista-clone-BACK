export interface UserStructure {
  _id: string;
  name: string;
  authId: string;
}

export interface PropertyStructure {
  id: string;
  address: string;
  price: number;
  rooms: number;
  meters: number;
  year: number;
  bathrooms: number;
  aircon: boolean;
  consumption: number;
  elevator: boolean;
  parking: boolean;
  heating: boolean;
  emissions: number;
  level: string;
  description: string;
  image: string;
  user: string;
}
