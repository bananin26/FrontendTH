import { User } from './user';

export class Message {
  idMessage: number = 0;
  title: string = '';
  content: string = '';
  userSend: User = new User();
  userReceives: User = new User();
}
