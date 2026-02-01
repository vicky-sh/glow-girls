import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../analytics-service';

@Component({
  selector: 'app-body',
  imports: [RouterLink],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body implements OnInit {
  public trackingService = inject(AnalyticsService);

  ngOnInit(): void {
    this.trackingService.homeViewed();
  }
}
