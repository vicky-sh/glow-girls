import { Component, ElementRef, inject, output, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LayoutStateService } from '../layout-state-service';
import { AnalyticsService } from '../analytics-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public layout = inject(LayoutStateService);
  public trackingService = inject(AnalyticsService);

  toggleMenu(): void {
    this.layout.toggleMenu();
  }

  bookAppointmentClicked() {
    this.trackingService.globalBookAppintmentClicked();
  }
}
