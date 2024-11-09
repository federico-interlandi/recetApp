import { Component, OnInit } from '@angular/core';
import { ModalService } from '@shared/services/warning-modal.service';


@Component({
  selector: 'app-global-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.css']
})
export class WarningModalComponent implements OnInit {
  showModal = false;
  warningMessage = '';
  confirmAction: () => void = () => {};
  cancelAction: () => void = () => {};

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.showModal$.subscribe(show => this.showModal = show);
    this.modalService.warningMessage$.subscribe(message => this.warningMessage = message);
    this.modalService.confirmAction$.subscribe(action => this.confirmAction = action);
  }

  onConfirmAction(): void {
    this.confirmAction();
    this.modalService.closeModal();
  }

  onCancelAction(): void {
    this.modalService.closeModal();
  }
}
