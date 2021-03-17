import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import {
  ServicestoreService,
  DtosServiceStoreItemDto,
  ServiceService,
  DtosServiceYamlDto, DtosServiceStoreItemFormDto,
} from 'src/app/share/swagger-auto-gen';
import { ClrWizard, ClrWizardPage } from '@clr/angular';
import * as ace from 'ace-builds';
import 'ace-builds/webpack-resolver';
import {NotificationService} from '../../services/notification/notification.service';
import {Outlet} from '../../services/notification/outlet';
import {NotificationType} from '../../services/notification/notificationtype';
import {Notification} from '../../services/notification/notification';

@Component({
  selector: 'app-create-service-wizard',
  // Bind the "mySchema" member to the schema string of the Form component.
  templateUrl: './create-service-wizard.component.html',
  styleUrls: ['./create-service-wizard.component.scss'],
  providers: [ServicestoreService, NotificationService]
})
export class CreateServiceWizardComponent implements OnInit {
  @ViewChild('wizard') wizard: ClrWizard;
  @ViewChild('wizardFirstPage') wizardFirstPage: ClrWizardPage;

  @Input() formJson: object;
  @Output() yamlCreated = new EventEmitter<string>();

  yamlText: string;
  serviceStoreItem: DtosServiceStoreItemDto = new Object();
  jsonForm: any;
  jsonFormPageNavTitles: string[];
  formResult: object = new Object();
  private notificationOutlet: string;

  constructor(private servicestoreService: ServicestoreService, private notificationService: NotificationService) { }

  open(serviceStoreItem: DtosServiceStoreItemDto): void {
    this.serviceStoreItem = serviceStoreItem;
    this.getFormJSON();
  }

  ngOnInit(): void { }

  finish(): void {
    this.yamlCreated.emit(this.yamlText);
    // this.wizard.goTo('clr-wizard-page-firstpage');
    this.wizard.currentPage = this.wizardFirstPage;
  }

  getFormJSON(): void {
    this.servicestoreService.servicestoreFormServicetypeGet(this.serviceStoreItem.type)
      .subscribe({
        next: (dtosServiceStoreItemYamlDto: DtosServiceStoreItemFormDto) => {
          this.jsonForm = JSON.parse(dtosServiceStoreItemYamlDto.formJson);
          this.jsonFormPageNavTitles = Object.keys(this.jsonForm.properties);
          this.wizard.open();
        }
      });
  }

  onWizardPagesChanged(): void {
    if (this.wizard.pageCollection.pages.length === 0)
      return;

    const page = this.wizard.pageCollection.pages.first;
    this.wizard.currentPage = page;

    // this.wizard.currentPage = page
    // this.wizard.goTo(page.id)
  }

  getPagefromForm(pageName): any {
    // console.log(this.jsonForm.properties[pageName])
    return this.jsonForm.properties[pageName];
  }

  
  onResultJsonChange(formResult: object, pageKey: string): void {
    if (formResult == null || pageKey == null) {
      return;
    }


    this.formResult[pageKey] = formResult;
  }

  notificationIsOpen(outlet: string): boolean {
    return this.notificationOutlet === outlet;
  }


  setEditorYAML(): void {
    this.servicestoreService
      .servicestoreYamlServicetypePost(JSON.stringify(this.formResult), this.serviceStoreItem.type)
      .subscribe({
        next: dtosServiceStoreItemYamlDto => {
          this.yamlText = dtosServiceStoreItemYamlDto.yaml;
        }
      });

    this.notificationService.useOutlet(Outlet.global);
  }


}
