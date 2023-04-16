type User = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type Review = {
  id: number;
  user: User;
  rating: number;
  date: string;
  comment: string;
}
