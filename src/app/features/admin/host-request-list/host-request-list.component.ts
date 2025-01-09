import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../../core/services/request.service';
import {Request} from '../../../core/models/Request';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-host-request-list',
  templateUrl: './host-request-list.component.html',
  styleUrl: './host-request-list.component.scss'
})
export class HostRequestListComponent implements OnInit {
  requests$: Observable<Request[]> = of([]);
  selectedRequest: Request | null = null;
  showAcceptModal: boolean = false;
  showRejectModal: boolean = false;
  rejectReason: string = '';

  constructor(private requestService: RequestService) {
  }

  ngOnInit(): void {
    this.requests$ = this.requestService.getRequests();
  }

  selectRequest(request: Request) {
    this.selectedRequest = request;
  }

  updateStatus(status: string, message: string) {
    if (this.selectedRequest) {
      const id = this.selectedRequest.id || '';
      //this.requests$ = this.requestService.updateRequestStatus(id, status, message);
      this.requestService.updateRequestStatus(id, status, message).subscribe(
        () => {
          this.selectedRequest!.hostStatus = status;
          this.selectedRequest = null;
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du statut :', error);
        }
      );
    }
    this.closeModal();
  }


  openAcceptModal() {
    this.showAcceptModal = true;
  }

  openRejectModal() {
    this.showRejectModal = true;
  }

  confirmAccept() {
    this.updateStatus("ACCEPTED", "Votre demande de compte hébergeur a été accepté");
  }

  confirmReject() {
    if(!this.rejectReason.trim()) {
      return;
    }
    this.updateStatus("DECLINED", this.rejectReason);
  }

  closeModal() {
    this.showAcceptModal = false;
    this.showRejectModal = false;
  }
}
