type Host = {
  id: number;
  avatarUrl: string;
  name: string;
  isPro: boolean;
}

type Location = {
  latitude: number;
  longitude: number;
  zoom?: number;
}

export type City = {
  location: Location;
  name: string;
}

export type Offer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: Host;
  id: number;
  images: string[];
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
}
