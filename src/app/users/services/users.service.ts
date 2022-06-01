/* eslint-disable prefer-const */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserResponse } from '../interfaces/responses/user-response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  getUser(id?: string): Observable<any> {
    let options = {
      headers: new HttpHeaders().set('Authoritation', 'Bearer ' + localStorage.getItem('accessToken'))
    };

    if (!id) {
      return this.http.get<any>('users/me', options).pipe(
        map((resp) => resp),
        catchError((resp: HttpErrorResponse) =>
          throwError(
            () =>
              `Error getting user. Status: ${resp.status}. Message: ${resp.message}`
          ))
      );
    } else {
      return this.http.get<any>(`users/${id}`, options).pipe(
        map((resp) => resp),
        catchError((resp: HttpErrorResponse) =>
          throwError(
            () =>
              `Error getting user. Status: ${resp.status}. Message: ${resp.message}`
          ))
      );
    }
  }

  editNameAndEmail(name: string, email: string): Observable<void> {
    return this.http.put<void>('users/me', { name, email }).pipe(map(resp => resp));
  }

  editAvatar(avatar: string): Observable<void> {
    return this.http.put<void>('users/me/photo', { avatar }).pipe(map(resp => resp));
  }

  editPassword(password: string): Observable<void> {
    return this.http.put<void>('users/me/password', { password }).pipe(map(resp => resp));
  }
}
