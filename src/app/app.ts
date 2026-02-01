import { Component, inject, signal } from '@angular/core';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Home } from './home/home';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { filter } from 'rxjs';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('glow-girls-parlour');
  private router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (typeof gtag === 'function') {
          gtag('config', 'G-SYQ6VJE1G8', {
            page_path: event.urlAfterRedirects,
          });
        }
      });
  }
}
