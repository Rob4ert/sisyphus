import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User, Routine, ApiResponseRoutine, ApiResponseUser } from './interfaces';



const url = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})


export class APIClientService {

  constructor(private http: HttpClient) { }
  // user handling requests
  createUser(user: User): Observable<User> {
    return this.http.post<ApiResponseUser>(url, user, {
      withCredentials: true,
    }).pipe(map(response => {
      return response.data;
    }));
  }

  getUser(): Observable<User> {
    return this.http.get<ApiResponseUser>(`${url}/login`, {
      withCredentials: true,
    }).pipe(map(response => {
      return response.data;
    }));
  }

  loginUser(user: User): Observable<User> {
    return this.http.post<ApiResponseUser>(`${url}/login`, user, {
      withCredentials: true,
    }).pipe(map(response => {
      return response.data;
    }));
  }
  logoutUser(): Observable<User> {
    return this.http.post<ApiResponseUser>(`${url}/logout`, 'logout', {
      withCredentials: true,
    }).pipe(map(response => {
      return response.data;
    }));
  }

  // routine handling requests

  SaveRoutine(routine: Routine) {
    return this.http.post<ApiResponseRoutine>(`${url}/routine`, routine, {
      withCredentials: true,
    }).pipe(map(response => {
      return response.data;
    }));
  }

  // getRoutine(routineId: number) {
  //   return this.http.get<ApiResponseRoutine>(`${url}/routine`, {
  //     withCredentials: true,
  //   }).pipe(map(response => {
  //     return response.data;
  //   }));

  // }

}

