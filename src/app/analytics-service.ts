import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  event(eventName: string, params: Record<string, any> = {}) {
    if (typeof gtag !== 'function') {
      console.warn('gtag is not loaded yet.');
      return;
    }

    gtag('event', eventName, params);
  }

  pageView(pageTitle: string, pagePath: string) {
    if (typeof gtag !== 'function') {
      console.warn('gtag is not loaded yet.');
      return;
    }

    gtag('event', 'page_view', {
      page_title: pageTitle,
      page_path: pagePath,
    });
  }

  globalBookAppintmentClicked() {
    this.event('global_book_appointment_click', {
      page: 'all',
    });
  }

  homeViewed() {
    this.pageView('Home', '/home');
  }

  servicesViewed() {
    this.pageView('Services', '/services');
  }

  galleryViewed() {
    this.pageView('Gallery', '/gallery');
  }

  contactViewed() {
    this.pageView('Contact', '/contact');
  }

  serviceViewed(serviceName: string) {
    this.event('service_book_now', {
      page: 'services',
      service_name: serviceName,
    });
  }

  serviceCategoryClicked(categoryName: string) {
    this.event('service_category_click', {
      page: 'services',
      category_name: categoryName,
    });
  }

  contactFormSubmitted() {
    this.event('contact_form_submit', {
      page: 'contact',
    });
  }
}
