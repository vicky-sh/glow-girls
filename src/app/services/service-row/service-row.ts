import { Component, inject, input } from '@angular/core';
import { AnalyticsService } from '../../analytics-service';

@Component({
  selector: 'tr[app-service-row]',
  imports: [],
  templateUrl: './service-row.html',
  styleUrl: './service-row.css',
})
export class ServiceRow {
  public serviceName = input.required<string>();
  public description = input.required<string>();
  public price = input.required<number>();
  public bookingLink = input<string>();
  private trackingService = inject(AnalyticsService);

  trackBookService() {
    this.trackingService.serviceViewed(this.serviceName());
  }
}