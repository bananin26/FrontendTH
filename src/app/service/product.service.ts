import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../model/product';
import { TotalProductForUserDTO } from '../model/TotalProductForUserDTO';
import { ListPricesGrearterThan1000DTO } from '../model/ListPricesGreaterThan1000DTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private url = `${base_url}/Products`;
  private listaCambio = new Subject<Product[]>();
  constructor(private http: HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Product[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(product: Product) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, product, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Product[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Product>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(p: Product) {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, p, {
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
  getPurchases():Observable<TotalProductForUserDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<TotalProductForUserDTO[]>(`${this.url}/ProductForUser`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),

    });
  }
  getListPrice():Observable<ListPricesGrearterThan1000DTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<ListPricesGrearterThan1000DTO[]>(`${this.url}/ListPricesGreaterThan1000`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),

    });


  }
  

}
