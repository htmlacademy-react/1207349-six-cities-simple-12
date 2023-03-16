type Host = {
  id: number;
  avatar: string;
  name: string;
  isPro: boolean;
}

export type Offer = {
  id: number;
  images: string[];
  title: string;
  description: string;
  isPremium: boolean;
  type: string;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: Host;
  reviews: number[];
  coordinates: [number, number];
  city: string;
}
