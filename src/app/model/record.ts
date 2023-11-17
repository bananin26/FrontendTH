import { Product } from './product';
import { User } from './user';

export class Record {
  idRecord: number = 0;
  payment: string = '';
  paymentDate: Date = new Date(Date.now());
  arriveDate: Date = new Date(Date.now());
  points: number = 0;
  product: Product = new Product();
  user: User = new User();
}
