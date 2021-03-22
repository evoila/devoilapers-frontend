import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DtosServiceInstanceActionDto, ServiceService, DtosServiceInstanceDetailsDto } from 'src/app/share/swagger-auto-gen';
import { NotificationService } from '../../services/notification/notification.service';
import { trigger } from '@angular/animations';
import { Outlet } from '../../services/notification/outlet';
import { NotificationType } from '../../services/notification/notificationtype';
import { Notification } from '../../services/notification/notification';

@Component({
  selector: 'app-action-response-modal',
  // Bind the "mySchema" member to the schema string of the Form component.
  templateUrl: './action-response-modal.component.html',
  styleUrls: ['./action-response-modal.component.scss']
})
export class ActionResponseModalComponent implements OnInit {
  modalIsOpen = false;
  responseObject: any;
  private notificationOutlet: string;

  @Input() action: DtosServiceInstanceActionDto;
  @Output() closing = new EventEmitter();


  constructor(private notificationService: NotificationService) { }

  open(responseObject: any): void {
    this.modalIsOpen = true;
    this.responseObject = responseObject;
  }

  onOpenChange(isOpen: boolean): void {
    if (!isOpen) {
      this.closing.emit();
    }
  }

  notificationResponseIsOpen(): boolean {
    return this.notificationOutlet === Outlet.responseModal;
  }

  ngOnInit(): void {
    this.notificationService.useOutlet(Outlet.responseModal);
  }
}
