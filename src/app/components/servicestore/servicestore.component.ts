import {
  AfterViewInit,
  Component,
  ElementRef,
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
import {Notification, NotificationService, NotificationType} from '../../services/notification/notification.service';
import * as arraySort from 'array-sort'

@Component({
  selector: 'app-servicestore',
  templateUrl: './servicestore.component.html',
  styleUrls: ['./servicestore.component.scss'],
  providers: [ServicestoreService, ServiceService]
})
export class ServicestoreComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') private editor: ElementRef<HTMLElement>;

  services: Array<DtosServiceStoreItemDto>;
  serviceType: string;
  wizardYAML: string;
  aceEditor: any;
  clicked: boolean;

  constructor(private servicestoreService: ServicestoreService,
              private serviceService: ServiceService,
              private notification: NotificationService) { }

  ngOnInit(): void {
    this.servicestoreService.servicestoreInfoGet().subscribe({
      next: services => {        
        this.services = arraySort(services.services, ["type"]);

       },
    });
  }

  finish(): void {
    const dtosServiceYamlDto = {
      yaml: this.aceEditor.getValue()
    } as DtosServiceYamlDto;
    this.serviceService.servicesCreateServicetypePost(
      dtosServiceYamlDto, this.serviceType).subscribe({
        next: () => {
          this.notification.add(
            new Notification(
              NotificationType.Info,
              this.serviceType + ': Action successful executed.',
              'YAML:' + dtosServiceYamlDto.yaml,
            )
          );
          this.clicked = false;
        }
    });
    }

  open(serviceName): void{
    this.serviceType = serviceName;
    this.servicestoreService.servicestoreYamlServicetypeGet(this.serviceType)
      .subscribe({
          next: dtosServiceStoreItemYamlDto => {
            this.aceEditor.session.setValue(dtosServiceStoreItemYamlDto.yaml);
          }
      });
  }

  ngAfterViewInit(): void {
    ace.config.set('fontSize', '14px');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setMode('ace/mode/yaml');
  }
}
