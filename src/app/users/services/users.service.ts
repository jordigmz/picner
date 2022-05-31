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
  options: {headers: HttpHeaders};

  constructor(private http: HttpClient) { }

  getUser(id?: string): Observable<User> {
    console.log(localStorage.getItem('token'));
    if (!id) {
      this.options = {
        headers: new HttpHeaders().set('Authoritation', 'Bearer ' + localStorage.getItem('token'))
      };
      console.log(this.options);
      return this.http.get<UserResponse>('users/me', this.options).pipe(
        map(resp => resp.user),
        catchError((resp: HttpErrorResponse) =>
          throwError(
            () =>
              `Error getting your user. Status: ${resp.status}. Message: ${resp.message}`
          ))
      );
    }
    else {
      this.options = {
        headers: new HttpHeaders().set('Authoritation', 'Bearer ' + localStorage.getItem('token'))
      };
      return this.http.get<UserResponse>(`users/${id}`, this.options).pipe(
        map(resp => resp.user),
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
