import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { from, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/users/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logged = false;
  loginChange$ = new ReplaySubject<boolean>(1);

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<void> {
    return this.http
      .post<{ accessToken: string }>('auth/login', {
        username,
        password,
      })
      .pipe(
        switchMap(async (r) => {
          try {
            await Storage.set({ key: 'token', value: r.accessToken });
            this.setLogged(true);
          } catch (e) {
            throw new Error('Cannot save authentication token in storage!');
          }
        })
      );
  }

  register(user: User): Observable<void> {
    return this.http.post('auth/register', user).pipe(map(() => null));
  }

  async logout(): Promise<void> {
    await Storage.remove({ key: 'token' });
    this.setLogged(false);
  }

  isLogged(): Observable<boolean> {
    if (this.logged) {
      return of(true);
    }
    return from(Storage.get({ key: 'token' })).pipe(
      switchMap((token) => {
        if (!token.value) {
          throw new Error();
        }
        return this.http.get('auth/validate').pipe(
          map(() => {
            this.setLogged(true);
            return true;
          }),
          catchError((error) => of(false))
        );
      }),
      catchError((e) => of(false))
    );
  }

  private setLogged(logged: boolean) {
    this.logged = logged;
    this.loginChange$.next(logged);
  }
}
