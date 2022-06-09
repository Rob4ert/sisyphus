import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './interfaces';



const url = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})


export class APIClientService {




  constructor(private http: HttpClient) { }
  createUser(user: User): Observable<string> {
    return this.http.post<string>(url, user, {
      withCredentials: true,
    });
  }


}
