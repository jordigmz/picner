/* eslint-disable prefer-const */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Area, AreasResponse, AreaResponse } from '../interfaces/areas';
import { Comments } from '../interfaces/comments';

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  readonly areaURL = 'areas';
  constructor(private http: HttpClient) { }

  getAreas(): Observable<Area[]> {
    let options = {
      headers: new HttpHeaders().set('Authoritation', 'Bearer ' + localStorage.getItem('token'))
    };
    return this.http.get<AreasResponse>(this.areaURL, options).pipe(
      map((resp) => resp.areas),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          () =>
            `Error getting areas. Status: ${resp.status}. Message: ${resp.message}`
        ))
    );
  }

  getArea(id: string): Observable<Area> {
    return this.http.get<AreaResponse>(`areas/${id}`).pipe(
      map(resp => resp.area)
    );
  }

  addArea(area: Area): Observable<Area> {
    return this.http.post<AreaResponse>(`areas`, area).pipe(
      map(resp => resp.area)
    );
  }

  editArea(area: Area): Observable<void> {
    return this.http.put<void>(`areas/${area.id}`, area).pipe(
      map(resp => resp)
    );
  }

  deleteArea(idArea: string): Observable<void> {
    return this.http.delete(`${this.areaURL}/${idArea}`).pipe(map(() => null));
  }

  addComment(idArea: string, comment: string): Observable<Comments> {
    return this.http.post<{ comment: Comments }>(`${this.areaURL}/${idArea}/comments`, { text: comment }).pipe(
      map(resp => {
        resp.comment.user.avatar = environment.baseUrl + '/' + resp.comment.user.avatar;
        return resp.comment;
      })
    );
  }

  getComments(idArea: string): Observable<Comments[]> {
    return this.http.get<{ comments: Comments[] }>(`${this.areaURL}/${idArea}/comments`).pipe(
      map(resp => resp.comments.map(c => {
        c.user.avatar = environment.baseUrl + '/' + c.user.avatar;
        return c;
      }))
    );
  }
}