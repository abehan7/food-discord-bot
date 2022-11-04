export interface IReview {
  id: number;
  name: string;
  rough_location: string;
  exact_location: string;
  menus: IMenu[];
  photo_urls: string[];
  type: string;
  hashtags: string[];
  text: string;
  rating: number;
  created_at: string;
  author_url: string;
  author_name?: string;
  nearbyPlace?: string;
}

interface IMenu {
  name: string;
  price: number;
}
