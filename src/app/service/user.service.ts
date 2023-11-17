import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { QuantityMessageSendByUserDTO } from './../model/QuantityMessageSendByUserDTO';
import { QuantityMessageReceiveByUserDTO } from './../model/QuantityMessageReceiveByUserDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${base_url}/Users`;
  private listaCambio = new Subject<User[]>();
  constructor(private http: HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<User[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(user: User) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, user, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: User[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<User>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(u: User) {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, u, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  delete(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  search(fecha: string): Observable<User[]> {
    let token = sessionStorage.getItem('token');
    return this.http.post<User[]>(
      `${this.url}/search`,
      { fecha: fecha },
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }

  getReceive():Observable<QuantityMessageReceiveByUserDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<QuantityMessageReceiveByUserDTO[]>(`${this.url}/QuantityMessageReceiveByUser`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),

    });
  }

  getSend():Observable<QuantityMessageSendByUserDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<QuantityMessageSendByUserDTO[]>(`${this.url}/QuantityMessageSendByUser`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),

    });
  }
}
