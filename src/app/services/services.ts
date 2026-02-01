import {
  AfterViewInit,
  Component,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { ServiceRow } from './service-row/service-row';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ServiceCategory } from './models/service-models';
import { LayoutStateService } from '../layout-state-service';
import { take } from 'rxjs';
import { AnalyticsService } from '../analytics-service';

@Component({
  selector: 'app-services',
  imports: [ServiceRow, CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private httpClient = inject(HttpClient);
  public selectedSection = signal<string>('threading');
  private sectionIds = ['threading', 'hair-cutting', 'bleaching', 'facials', 'waxing', 'nail-care'];
  public serviceCategories = signal<ServiceCategory[]>([]);
  public isLargeScreen = signal<boolean>(false);
  public layout = inject(LayoutStateService);
  public menuOpen = this.layout.menuOpen;
  public trackingService = inject(AnalyticsService);
  private fragmentToScroll: string | null = null;

  ngOnInit(): void {
    this.trackingService.servicesViewed();

    if (this.isBrowser) {
      this.isLargeScreen.set(window.innerWidth >= 1024);
    }

    // capture fragment once
    this.route.fragment.pipe(take(1)).subscribe((fragment) => {
      this.fragmentToScroll = fragment;
    });

    // load data
    this.httpClient.get<any[]>('services.json').subscribe({
      next: (data) => {
        this.serviceCategories.set(data);

        // scroll after DOM is updated
        if (this.isBrowser && this.fragmentToScroll) {
          setTimeout(() => {
            document
              .getElementById(this.fragmentToScroll!)
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 50);
        }
      },
      error: (error) => console.error('Error fetching services:', error),
    });
  }

  public navigateToSection(section: string): void {
    if (!this.isBrowser) return;
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });

    this.selectedSection.set(section);
    this.router.navigate([], { fragment: section, replaceUrl: true });
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!this.isBrowser) return;
    for (const id of this.sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();

      // section is near top of viewport
      if (rect.top <= 150 && rect.bottom >= 150) {
        this.selectedSection.set(id);
        break;
      }
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (!this.isBrowser) return;
    this.isLargeScreen.set(window.innerWidth >= 1024);
  }

  trackServiceCategoryClicked(categoryName: string) {
    this.trackingService.serviceCategoryClicked(categoryName);
  }
}
