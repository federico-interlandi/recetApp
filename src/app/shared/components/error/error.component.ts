import { Component } from '@angular/core';
import { ErrorNotificationService } from '@shared/services/error-notification.service';

@Component({
  selector: 'app-error-notification',
  template: `
    <div *ngIf="error$ | async as error" class="error-notification">
      <span class="error-icon">⚠️</span>
      <span class="error-message">{{ error }}</span>
    </div>
  `,
  styleUrls: ['./error.component.css']
})
export class ErrorNotificationComponent {
  error$;

  constructor(private errorNotificationService: ErrorNotificationService) {
    this.error$ = this.errorNotificationService.error$;
  }
}
