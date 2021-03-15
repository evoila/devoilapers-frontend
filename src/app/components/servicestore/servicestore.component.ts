import {
  AfterViewInit,
  Component,
  ElementRef, OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ServicestoreService,
  DtosServiceStoreItemDto,
  ServiceService,
  DtosServiceYamlDto,
} from 'src/app/share/swagger-auto-gen';
import * as ace from 'ace-builds';
import 'ace-builds/webpack-resolver';
import {NotificationService} from '../../services/notification/notification.service';
import * as arraySort from 'array-sort'
import {Outlet} from '../../services/notification/outlet';
import {NotificationType} from '../../services/notification/notificationtype';
import {Notification} from '../../services/notification/notification';

@Component({
  selector: 'app-servicestore',
  templateUrl: './servicestore.component.html',
  styleUrls: ['./servicestore.component.scss'],
  providers: [ServicestoreService, ServiceService]
})
export class ServicestoreComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editor') private editor: ElementRef<HTMLElement>;

  services: Array<DtosServiceStoreItemDto>;
  serviceType: string;
  aceEditor: any;
  clicked: boolean;
  private notificationOutlet: string;

  constructor(private servicestoreService: ServicestoreService,
              private serviceService: ServiceService,
              private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.notificationService.close();
    this.notificationService.useOutlet(Outlet.global);
    this.subscribeToNotificationOutlet();

    this.servicestoreService.servicestoreInfoGet().subscribe({
      next: services => {
        this.services = arraySort(services.services, ["type"]);

       },
    });

  }

  subscribeToNotificationOutlet(){
    this.notificationService.currentNotificationOutlet.subscribe(
      notificationOutlet => this.notificationOutlet = notificationOutlet
    )
  }

  notificationIsOpen(outlet: string): boolean {
    return this.notificationOutlet === outlet;
  }

  useGlobalNotificationSuccess(): void {
    this.notificationService.useOutletOnSuccess(Outlet.global);
  }

  useEditorModalNotificationSuccess(): void {
    this.notificationService.useOutletOnSuccess(Outlet.global);
  }

  finish(): void {
    this.clicked = true;
    const dtosServiceYamlDto = {
      yaml: this.aceEditor.getValue()
    } as DtosServiceYamlDto;
    this.serviceService.servicesCreateServicetypePost(
      dtosServiceYamlDto, this.serviceType).subscribe({
        next: () => {
          this.useGlobalNotificationSuccess();
          this.notificationService.addSuccess(
            new Notification(
              NotificationType.Info,
              this.serviceType + ': Action successful executed.',
              'YAML:' + dtosServiceYamlDto.yaml,
            )
          );
        }
    });
    this.clicked = false;
  }

  open(serviceName): void{
    this.notificationService.close();
    this.notificationService.useOutletOnSuccess(Outlet.global);
    this.notificationService.useOutletOnError(Outlet.editorModal);

    this.serviceType = serviceName;
    this.servicestoreService.servicestoreYamlServicetypeGet(this.serviceType)
      .subscribe({
          next: dtosServiceStoreItemYamlDto => {
            this.aceEditor.session.setValue(dtosServiceStoreItemYamlDto.yaml);
          }
      });

    this.notificationService.useOutlet(Outlet.global);
  }

  ngAfterViewInit(): void {
    ace.config.set('fontSize', '14px');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setMode('ace/mode/yaml');
  }

  ngOnDestroy() {
    this.notificationService.close();
  }
}
