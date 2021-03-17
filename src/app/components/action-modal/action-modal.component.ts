import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { DtosServiceInstanceActionDto, DtosServiceInstanceDetailsDto, ServiceService } from '../../share/swagger-auto-gen';
import { NotificationService } from '../../services/notification/notification.service';
import { trigger } from '@angular/animations';
import { Outlet } from '../../services/notification/outlet';
import { NotificationType } from '../../services/notification/notificationtype';
import { Notification } from '../../services/notification/notification';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent implements OnInit {
  @Output()
  closeEvent = new EventEmitter();

  set openModal(value: boolean) {
    const oldValue = this._openModal;
    this._openModal = value;

    if (oldValue !== value && !value && !this.openResponseModal && !this.responseModalIsOpening) {
      this.notificationService.useOutlet(Outlet.detailsModal);
      this.closeEvent.emit();
    }
  }

  get openModal(): boolean {
    return this._openModal;
  }

  set openResponseModal(value: boolean) {
    const oldValue = this._openResponseModal;
    this._openResponseModal = value;

    if (oldValue !== value && !value && !this.openModal) {
      this.notificationService.useOutlet(Outlet.responseModal);
      this.closeEvent.emit();
    }
  }

  get openResponseModal(): boolean {
    return this._openResponseModal;
  }


  private _openResponseModal = false;
  private formResult: object;
  private _openModal = false;
  private notificationOutlet: string;
  private responseModalIsOpening = false;
  responseObject: any;
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
    )
  }

  notificationIsOpen(): boolean {
    return this.notificationOutlet === Outlet.actionModal;
  }

  notificationResponseIsOpen(): boolean {
    return this.notificationOutlet === Outlet.responseModal;
  }

  displayAction(
    selectedService: DtosServiceInstanceDetailsDto,
    selectedAction: DtosServiceInstanceActionDto
  ): void {
    this.notificationService.useOutletOnError(Outlet.actionModal);
    this.notificationService.close();

    this.selectedService = selectedService;
    this.selectedAction = selectedAction;

    this.responseModalIsOpening = false;
    this.openResponseModal = false;

    this.selectedForm = JSON.parse(this.selectedAction.form);
    this.openModal = true;
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
          this.responseModalIsOpening = true;
          this.openResponseModal = true;
          this.responseObject = JSON.parse(actionResultJson);
        }

        // Close modal
        this.closeAction();

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

  closeAction(): void {
    this.openModal = false;
  }

  onResultJsonChange(formResult: object): void {
    this.formResult = formResult;
  }

  closeActionResponse(): void {
    this.responseModalIsOpening = false;
    this.openResponseModal = false;
  }

}
