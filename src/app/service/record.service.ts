import { PointsDTO } from './../model/PointsDTO';
import { environment } from './../../environments/environment';
import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Record } from '../model/record';


const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})

export class RecordService {

  private url = `${base_url}/Records`;
  private listaCambio = new Subject<Record[]>();
  constructor(private http: HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Record[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(record: Record) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, record, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Record[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Record>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(r: Record) {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, r, {
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

  getPoints():Observable<PointsDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<PointsDTO[]>(`${this.url}/CountPoints`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),

    });
  }
}
