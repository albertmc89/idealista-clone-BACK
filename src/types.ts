export interface UserStructure {
  _id: string;
  name: string;
  authId: string;
}

export interface PropertyStructure {
  _id: string;
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
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  user: string;
  __v?: number;
}
