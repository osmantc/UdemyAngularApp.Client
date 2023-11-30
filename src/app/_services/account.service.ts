import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = 'https://localhost:5001/api/';

  private currentUserSource: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  currentUser$: Observable<User | null> = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'account/login', model).pipe(
      tap((response: User) => {
        const user: User = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  //dışarıdan setlemeler için expose point.
  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  register(registerModel: any): Observable<any> {
    return this.http
      .post<User>(this.baseUrl + 'account/register', registerModel)
      .pipe(
        map((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }
        })
      );
  }

  callServerError(): Observable<any> {
    return this.http.get<String>(this.baseUrl + 'buggy/server-error');
  }
}
