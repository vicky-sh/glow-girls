import { Component, Inject, input } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-snackbar',
  imports: [],
  standalone: true,
  templateUrl: './message-snackbar.html',
  styleUrl: './message-snackbar.css',
})
export class MessageSnackbar {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: boolean) {}
}
