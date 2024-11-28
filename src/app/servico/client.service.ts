import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url:string = 'https://client-api-nkpc.onrender.com'

  constructor(private http:HttpClient) { }

  selectAllClients():Observable<Client[]>{
    return this.http.get<Client[]>(this.url);
  }

  register(obj:Client):Observable<Client>{
    return this.http.post<Client>(this.url, obj)
  }

  edit(obj:Client):Observable<Client>{
    return this.http.put<Client>(this.url, obj)
  }

  remove(cod:number):Observable<void>{
    return this.http.delete<void>(this.url + '/' + cod);
  }
  
}
