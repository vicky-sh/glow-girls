import { AfterViewInit, Component, input } from '@angular/core';

@Component({
  selector: 'app-gallery-card',
  imports: [],
  templateUrl: './gallery-card.html',
  styleUrl: './gallery-card.css',
})
export class GalleryCard implements AfterViewInit {
  image = input.required<string>();
  modalId = `gallery-modal-${Math.random().toString(36).slice(2)}`;

  ngAfterViewInit() {
    // Small delay to ensure DOM is fully in place
    setTimeout(() => {
      if (window && (window as any).HSOverlay) {
        (window as any).HSOverlay.autoInit();
      }
    });
  }
}
