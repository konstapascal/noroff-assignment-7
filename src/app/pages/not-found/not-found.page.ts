import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.css'],
})
export class NotFoundPage implements OnInit {
  constructor(private readonly router: Router) {
    setTimeout(() => this.router.navigateByUrl('/'), 2000);
  }

  ngOnInit(): void {}
}
