import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showModalSubject = new BehaviorSubject<boolean>(false);
  private warningMessageSubject = new BehaviorSubject<string>('');
  private confirmActionSubject = new BehaviorSubject<() => void>(() => {});

  get showModal$(): Observable<boolean> {
    return this.showModalSubject.asObservable();
  }

  get warningMessage$(): Observable<string> {
    return this.warningMessageSubject.asObservable();
  }

  get confirmAction$(): Observable<() => void> {
    return this.confirmActionSubject.asObservable();
  }


  openModal(warningMessage: string, confirmAction: () => void): void {
    this.warningMessageSubject.next(warningMessage);
    this.confirmActionSubject.next(confirmAction);
    this.showModalSubject.next(true);
  }

  closeModal(): void {
    this.showModalSubject.next(false);
  }
}
