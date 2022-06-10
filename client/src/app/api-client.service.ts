import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
import { User, ApiResponse } from './interfaces';



const url = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})


export class APIClientService {

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.http.post<ApiResponse>(url, user, {
      withCredentials: true,
    }).pipe(map(response => {
      return response.data;
    }));
  }

  loginUser(user: User): Observable<User> {
    return this.http.post<ApiResponse>(`${url}/login`, user, {
      withCredentials: true,
    }).pipe(map(response => {
      return response.data;
    }));
  }
  logoutUser(): Observable<User> {
    return this.http.post<ApiResponse>(`${url}/logout`, 'logout', {
      withCredentials: true,
    }).pipe(map(response => {
      return response.data;
    }));
  }

}
