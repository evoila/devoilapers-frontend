import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {
  ServicestoreService,
  DtosServiceStoreItemDto,
  DtosServiceStoreItemFormDto,
} from 'src/app/share/swagger-auto-gen';
import { ClrWizard, ClrWizardPage } from '@clr/angular';
import 'ace-builds/webpack-resolver';
import { NotificationService } from '../../services/notification/notification.service';
import { Outlet } from '../../services/notification/outlet';

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

  /** Wizard finished */
  @Output() yamlCreated = new EventEmitter<string>();
  /** Wizard canceled */
  @Output() canceled = new EventEmitter<void>();

  public yamlText: string;
  public serviceStoreItem: DtosServiceStoreItemDto = new Object();
  public jsonForm: any;
  public jsonFormPageNavTitles: string[];
  public formResult: object = new Object();
  private notificationOutlet: string;

  constructor(private servicestoreService: ServicestoreService, private notificationService: NotificationService) { }

  open(serviceStoreItem: DtosServiceStoreItemDto): void {
    this.serviceStoreItem = serviceStoreItem;
    this.getFormJSON();
  }

  ngOnInit(): void { }

  /** Wizard finished */
  finish(): void {
    this.yamlCreated.emit(this.yamlText);
    this.wizard.currentPage = this.wizardFirstPage;
  }

  /** Get json ngx form from backend */
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

  /** Return schema-form wizard page content from form by page name */
  getPagefromForm(pageName): any {
    return this.jsonForm.properties[pageName];
  }

  /** Gets called if the ngx-schema-form value changes */
  onResultJsonChange(formResult: object, pageKey: string): void {
    if (formResult == null || pageKey == null) {
      return;
    }

    // Concat form since we split it up for each wizard page
    this.formResult[pageKey] = formResult;
  }

  notificationIsOpen(outlet: string): boolean {
    return this.notificationOutlet === outlet;
  }


  /** Gets called if the wizard closes */
  onWizardCancel(): void {
    this.canceled.emit();
    this.wizard.currentPage = this.wizardFirstPage;
  }

  /** Query the backend to generate the yaml based on the form values and set it in the editor */
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
