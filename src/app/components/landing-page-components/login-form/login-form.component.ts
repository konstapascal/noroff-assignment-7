import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  public onSubmit(form: NgForm): void {
    const { username } = form.value;

    this.authService.login(username).subscribe({
      next: (user: User) => {
        this.userService.setUser(user);
        this.router.navigateByUrl('/catalogue');
      },
    });
  }
}
