import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly pokemonService: PokemonService
  ) {}

  public username = this.userService.user?.username;
  public route = this.router.url;

  public onLogout(): void {
    this.authService.logout();
    this.pokemonService.clearPokemon();
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {}
}
