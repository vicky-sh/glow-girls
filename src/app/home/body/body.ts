import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../analytics-service';
import { LayoutStateService } from '../../layout-state-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-body',
  imports: [RouterLink],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body implements OnInit {
  public trackingService = inject(AnalyticsService);
  public layout = inject(LayoutStateService);
  public menuOpen = this.layout.menuOpen;
  public isLargeScreen = signal<boolean>(false);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit(): void {
    this.trackingService.homeViewed();
    if (this.isBrowser) {
      this.isLargeScreen.set(window.innerWidth >= 1024);
    }
  }
}
