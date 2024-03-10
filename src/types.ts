export interface UserStructure {
  _id: string;
  name: string;
  authId: string;
}

export interface PropertyStructure {
  _id: string;
  type: string;
  city: string;
  address: string;
  price: number;
  rooms: number;
  meters: number;
  year: number;
  bathrooms: number;
  aircon: string;
  consumption: number;
  elevator: string;
  parking: string;
  heating: string;
  emissions: number;
  rent: number;
  level: string;
  description: string;
  isRented: boolean;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  user: string;
  __v?: number;
}

export interface ReceivedProperty {
  type: string;
  city: string;
  address: string;
  price: number;
  rooms: number;
  meters: number;
  year: number;
  bathrooms: number;
  aircon: string;
  consumption: number;
  emissions: number;
  rent: number;
  level: string;
  description: string;
  elevator: string;
  parking: string;
  heating: string;
  isRented: boolean;
  image1: string;
}
