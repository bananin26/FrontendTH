import { Message } from "./message";
import { User } from "./user";

export class Notification {
    idNotification: number = 0;
    title: string = '';
    description: string = '';
    date: Date = new Date(Date.now());
    viewed: boolean = false;
    user:User=new User();
    message:Message=new Message();
}