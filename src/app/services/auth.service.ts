import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../models/user.model';
import { UserService } from './user.service';

const { TRAINERS_API_URL, TRAINERS_API_KEY } = environment;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService
  ) {}

  public login(username: string): Observable<User> {
    return this.getUser(username).pipe(
      switchMap((user: User | undefined) => {
        if (!user) return this.createUser(username);
        return of(user);
      })
    );
  }

  public logout(): void {
    this.userService.clearUser();
  }

  public getUser(username: string): Observable<User | undefined> {
    return this.http
      .get<User[]>(`${TRAINERS_API_URL}?username=${username}`)
      .pipe(
        map((users: User[]) => {
          return users.pop();
        })
      );
  }

  private createUser(username: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': TRAINERS_API_KEY,
    });

    return this.http.post<User>(
      TRAINERS_API_URL,
      {
        username,
        pokemon: [],
      },
      { headers }
    );
  }
}
