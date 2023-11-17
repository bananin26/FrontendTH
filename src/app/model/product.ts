import { Category } from './category';
import { Trips } from './trips';
import { User } from './user';

export class Product {
  idProduct: number = 0;
  nameProduct: string = '';
  descriptionProduct: string = '';
  priceProduct: number = 0;
  dimensionsProduct: string = '';
  trips: Trips = new Trips();
  category: Category = new Category();
  user: User = new User();
}
