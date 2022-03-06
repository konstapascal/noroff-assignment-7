import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { PokemonService } from './pokemon.service';

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: User | undefined;

  constructor() {
    const storedUser = sessionStorage.getItem(USER_STORAGE_KEY);
    if (!storedUser) return;

    this.user = JSON.parse(storedUser) as User;
  }

  public setUser(user: User | undefined): void {
    this.user = user;
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }

  public clearUser(): void {
    this.user = undefined;
    sessionStorage.removeItem(USER_STORAGE_KEY);
  }
}
