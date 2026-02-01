import { Component, inject, OnInit, signal } from '@angular/core';
import { ContactModel } from './models';
import { email, form, required, FormField } from '@angular/forms/signals';
import { ContactConnectorService } from './contact.connector.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackbar } from './message-snackbar/message-snackbar';
import { AnalyticsService } from '../analytics-service';

@Component({
  selector: 'app-contact',
  imports: [FormField],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  private contactConnectorService = inject(ContactConnectorService);
  private _snackBar = inject(MatSnackBar);
  public trackingService = inject(AnalyticsService);

  contactModel = signal<ContactModel>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  ngOnInit(): void {
    this.trackingService.contactViewed();
  }

  contactForm = form(this.contactModel, (schemaPath) => {
    required(schemaPath.firstName, { message: 'First name is required' });
    required(schemaPath.lastName, { message: 'Last name is required' });
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
    required(schemaPath.message, { message: 'Write a message' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    const model = this.contactModel();
    console.log('Contact Model:', model);

    this.contactConnectorService
      .sendContactMessage({
        senderName: `${model.firstName} ${model.lastName}`,
        senderEmail: model.email,
        phoneNumber: model.phoneNumber,
        message: model.message,
      })
      .subscribe({
        next: (_) => {
          this._snackBar.openFromComponent(MessageSnackbar, {
            data: true,
            duration: 6000,
            panelClass: ['preline-toast-snackbar'],
          });
          this.contactModel.set({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            message: '',
          });
        },
        error: (_) => {
          this._snackBar.openFromComponent(MessageSnackbar, {
            data: false,
            duration: 6000,
            panelClass: ['preline-toast-snackbar'],
          });
        },
      });
  }

  trackFormSubmit() {
    this.trackingService.contactFormSubmitted();
  }
}
