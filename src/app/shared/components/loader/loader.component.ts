import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@shared/services/loader.service';


@Component({
  selector: 'app-loader',
  template: `
    <div *ngIf="loading$ | async" class="loader-overlay">
      <div class="loader"></div>
    </div>
  `,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  loading$;

  constructor(private loaderService: LoaderService) {
    this.loading$ = this.loaderService.loading$;
  }
}
