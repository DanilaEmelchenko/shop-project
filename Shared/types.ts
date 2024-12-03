export interface IComment {
  productId: string;
  id: string;
  name: string;
  email: string;
  body: string;
}

export interface IProduct {
  id: string;
  title: string;
  descriptions: string;
  price: number;
  comments?: IComment[];
}

export interface IProductImage {
  id: string;
  productId: string;
  main: boolean;
  url: string;
}