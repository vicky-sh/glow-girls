import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutStateService {
  private _menuOpen = signal(false);
  public isLargeScreen = signal<boolean>(false);

  constructor() {
    if (typeof window !== 'undefined') {
      this.isLargeScreen.set(window.innerWidth >= 1024);
    }
  }

  public menuOpen = this._menuOpen.asReadonly();

  toggleMenu() {
    this._menuOpen.update((v) => !v);
  }

  setMenuOpen(value: boolean) {
    this._menuOpen.set(value);
  }
}
