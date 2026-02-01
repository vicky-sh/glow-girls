import { Component, inject, OnInit } from '@angular/core';
import { GalleryCard } from './gallery-card/gallery-card';
import { AnalyticsService } from '../analytics-service';

@Component({
  selector: 'app-gallery',
  imports: [GalleryCard],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery implements OnInit {
  public trackingService = inject(AnalyticsService);
  ngOnInit(): void {
    this.trackingService.galleryViewed();
  }
}
