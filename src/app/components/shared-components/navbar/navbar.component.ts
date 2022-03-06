import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
    private readonly userService: UserService
  ) {}

  public username = this.userService.user?.username;

  public onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {}
}
