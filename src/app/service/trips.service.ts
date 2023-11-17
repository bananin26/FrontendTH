import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trips } from '../model/trips';
import { TotalTripsByUserDTO } from '../model/TotalTripsByUserDTO';


const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})

export class TripsService {
  private url = `${base_url}/Trips`;
  private listaCambio = new Subject<Trips[]>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Trips[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(tr: Trips) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, tr,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),      
    });
  }

  listId(id:number){
    let token = sessionStorage.getItem('token');
    return this.http.get<Trips>(`${this.url}/${id}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),  
    });
  }

  setList(listaNueva: Trips[]) {
    let token = sessionStorage.getItem('token');
    this.listaCambio.next(listaNueva);
  }
  getList() {
    let token = sessionStorage.getItem('token');
    return this.listaCambio.asObservable();
  }

  update(t: Trips) {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, t,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),  
    });
  }
  delete(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),  
    });
  }

  getTrips():Observable<TotalTripsByUserDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<TotalTripsByUserDTO[]>(`${this.url}/SumatoryTripsByUser`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),

    });
  }
  
}
