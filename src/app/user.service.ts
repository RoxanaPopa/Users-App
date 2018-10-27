import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'api/users';

  constructor(
    private http: HttpClient,
  ) { }

  /** GET users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }

  /** GET user by id. Return `undefined` when id not found */
  getUserNo404<Data>(id: number): Observable<User> {
    const url = `${this.usersUrl}/?id=${id}`;
    return this.http.get<User[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  /** GET user by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  //////// Save methods //////////
 
  /** POST: add a new user to the server */
  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions).pipe(
      catchError(this.handleError<User>('addUser'))
    );
  }
 
  /** DELETE: delete the user from the server */
  deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersUrl}/${id}`;
 
    return this.http.delete<User>(url, httpOptions).pipe(
      catchError(this.handleError<User>('deleteUser'))
    );
  }
 
  /** PUT: update the user on the server */
  updateUser (user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, httpOptions).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
       console.error(error); // log to console 

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
}

