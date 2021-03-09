import { Component, OnInit, Input, EventEmitter, Output, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'service-status',
  templateUrl: './service-status.component.html',
  styleUrls: ['./service-status.component.scss']
})
export class ServiceStatusComponent implements OnInit {

  private _status: string;

  @Output()
  public readonly closer: EventEmitter<any> = new EventEmitter();

  displayMsg = '';
  actionButtonLabel = 'Details';

  constructor() {

  }

  @Input()
  set status(val: string) {
    this._status = val;
  }

  get status() {
    return this._status;
  }

  get statusColor() {
    if (this._status === undefined) 
      return "#435560";

    let lowerCaseStatus = this._status.toLowerCase();

    switch (lowerCaseStatus) {
      case "ok":
        return "#9ecca4";
      case "warning":
        return "#f48b29";
      case "error":
        return "#ac0d0d";
      case "pending":
        return "#78c4d4";
    }

    return "#435560";
  }

  ngOnInit(): void {
    
  }

  public onClose(): void {
    this.closer.emit();
  }

  toggleErrorNotificationDetail(): void {
    this.actionButtonLabel = this.actionButtonLabel === 'Details' ? 'Less' : 'Details';
  }

}
