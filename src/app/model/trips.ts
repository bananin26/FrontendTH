import { User } from "./user";

export class Trips {
    idTrips: number = 0;
    shippingDate: Date = new Date(Date.now());
    arriveDate: Date = new Date(Date.now());
    destinationCountry: string = '';
    destinationCity: string = '';
    destinationAddress: string = '';
    originCountry: string = '';
    originCity: string = '';
    user: User = new User();
}