type User = {
  id: number;
  avatar: string;
  name: string;
}

export type Review = {
  id: number;
  user: User;
  rating: number;
  date: string;
  textReview: string;
}
