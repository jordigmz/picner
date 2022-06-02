/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserResponse } from '../interfaces/responses/user-response';
import { User } from '../interfaces/user';

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

  editUser(user: User): Observable<void> {
    return this.http.put<void>('users/me', user).pipe(map(resp => resp),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          () =>
            `Error updating user. Status: ${resp.status}. Message: ${resp.message}`
        ))
    );
  }

  editAvatar(user: User): Observable<void> {
    return this.http.put<void>('users/me/photo', user).pipe(map(resp => resp),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          () =>
            `Error updating user. Status: ${resp.status}. Message: ${resp.message}`
        ))
    );
  }

  editPassword(user: User): Observable<void> {
    return this.http.put<void>('users/me/password', user).pipe(map(resp => resp),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          () =>
            `Error updating user. Status: ${resp.status}. Message: ${resp.message}`
        ))
    );
  }
}
