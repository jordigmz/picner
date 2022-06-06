/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Area, AreaResponse, AreasResponse } from '../interfaces/areas';
@Injectable({
  providedIn: 'root'
})
export class AreasService {
  constructor(private http: HttpClient) { }

  getAreas(): Observable<Area[]> {
    let options = {
      headers: new HttpHeaders().set('Authoritation', 'Bearer ' + localStorage.getItem('accessToken'))
    };
    return this.http.get<any>('areas', options).pipe(
      map((resp) => resp),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          () =>
            `Error getting areas. Status: ${resp.status}. Message: ${resp.message}`
        ))
    );
  }

  getArea(id: string): Observable<Area> {
    let options = {
      headers: new HttpHeaders().set('Authoritation', 'Bearer ' + localStorage.getItem('accessToken'))
    };
    return this.http.get<any>(`areas/${id}`, options).pipe(
      map((resp) => resp),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          () =>
            `Error getting the area. Status: ${resp.status}. Message: ${resp.message}`
        ))
    );
  }

  addArea(area: Area): Observable<Area> {
    return this.http.post<AreaResponse>(`areas`, area).pipe(
      map(resp => resp.area)
    );
  }

  editArea(area: Area): Observable<void> {
    return this.http.put<void>(`areas/${area._id}`, area).pipe(
      map(resp => resp)
    );
  }

  deleteArea(idArea: string): Observable<void> {
    return this.http.delete(`areas/${idArea}`).pipe(map(() => null));
  }
}
