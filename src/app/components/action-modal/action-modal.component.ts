import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DtosServiceInstanceActionDto, DtosServiceInstanceDetailsDto, ServiceService } from '../../share/swagger-auto-gen';
import { NotificationService } from '../../services/notification/notification.service';
import { trigger } from '@angular/animations';
import { Outlet } from '../../services/notification/outlet';
import { NotificationType } from '../../services/notification/notificationtype';
import { Notification } from '../../services/notification/notification';
import { JsonPipe } from '@angular/common';
import { ActionResponseModalComponent } from '../action-response-modal/action-response-modal.component';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent implements OnInit {
  @ViewChild('responseModal') responseModal: ActionResponseModalComponent;

  @Output()
  closeEvent = new EventEmitter();


  private responseModalIsOpen: boolean;
  private formResult: object;
  private notificationOutlet: string;

  modalIsOpen = false;
  selectedService: DtosServiceInstanceDetailsDto = {};
  selectedAction: DtosServiceInstanceActionDto = {};
  selectedForm: {};

  constructor(
    private serviceService: ServiceService,
    private notificationService: NotificationService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.notificationService.useOutlet(Outlet.global);
    this.subscribeToNotificationOutlet();
  }

  subscribeToNotificationOutlet(): void {
    this.notificationService.currentNotificationOutlet.subscribe(
      notificationOutlet => {
        this.notificationOutlet = notificationOutlet;
        this.cdRef.detectChanges();
      }
    );
  }

  notificationIsOpen(): boolean {
    return this.notificationOutlet === Outlet.actionModal;
  }



  displayAction(
    selectedService: DtosServiceInstanceDetailsDto,
    selectedAction: DtosServiceInstanceActionDto
  ): void {
    this.notificationService.useOutletOnError(Outlet.actionModal);
    this.notificationService.close();

    this.selectedService = selectedService;
    this.selectedAction = selectedAction;

    this.selectedForm = JSON.parse(this.selectedAction.form);
    this.modalIsOpen = true;
  }

  executeAction(): void {
    // Convert form result to string
    const updatedPlaceholder = JSON.stringify(this.formResult);

    // Execute action on the backend
    this.serviceService.servicesActionServicetypeServicenameActioncommandPost(
      updatedPlaceholder,
      this.selectedService.type,
      this.selectedService.name,
      this.selectedAction.command
    ).subscribe({
      next: (response) => {
        const actionResultJson = response.resultJson;

        // Set the correct notification scope
        if (actionResultJson === null || actionResultJson === '') {
          this.notificationService.useOutletOnSuccess(Outlet.detailsModal);
        } else {
          this.notificationService.useOutletOnSuccess(Outlet.responseModal);     
               
          this.responseModalIsOpen = true;
          this.responseModal.open(JSON.parse(actionResultJson));
        }

        // Close modal
        this.closeModal();

        // Notify that action could be successfully executed
        this.notificationService.addSuccess(
          new Notification(
            NotificationType.Info,
            this.selectedAction.name + ': Action successful executed.',
            ' Type: ' + this.selectedService.type +
            ' Service Name: ' + this.selectedService.name,
          )
        );
      },
    });
  }

  closeModal(): void {
    this.modalIsOpen = false;
  }

  onResultJsonChange(formResult: object): void {
    this.formResult = formResult;
  }

  onResponseModalClose(): void {
    this.responseModalIsOpen = false;
    this.closeEvent.emit();
  }

  OnOpenChange(isOpen: boolean): void {
    if (!isOpen && !this.responseModalIsOpen) {
      this.closeEvent.emit();
    }
  }
}
