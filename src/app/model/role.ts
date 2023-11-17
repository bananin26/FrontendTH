import { JwtRequest } from "./jwtRequest";

export class Role {
    id: number = 0;
    rol: string = '';
    user: JwtRequest = new JwtRequest();
}

