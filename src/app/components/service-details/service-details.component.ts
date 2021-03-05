import { Router } from '@angular/router';
import {
  AfterViewInit,
  Component,
  ElementRef, OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  DtosServiceInstanceActionDto,
  DtosServiceInstanceDetailsDto,
  ServiceService
} from '../../share/swagger-auto-gen';
import * as ace from 'ace-builds';
import 'ace-builds/webpack-resolver';
import {ActionModalComponent} from '../action-modal/action-modal.component';
import {Notification, NotificationService, NotificationType} from '../../services/notification/notification.service';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
})
export class ServiceDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editor') private editor: ElementRef<HTMLElement>;
  @ViewChild(ActionModalComponent) actionModal: ActionModalComponent;

  private updateSubscription: Subscription;

  aceEditor: any;
  service: DtosServiceInstanceDetailsDto = {};
  openModal = false;
  openEditorModal = false;
  openDeleteModal = false;

  selectedAction: DtosServiceInstanceActionDto;
  serviceName: string;
  serviceType: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private notification: NotificationService,
  ) {
    // tslint:disable-next-line:new-parens
    this.selectedAction = new class implements DtosServiceInstanceActionDto {
      command: string;

    };
  }


  ngOnInit(): void {
    this.updateServiceList();
    this.updateSubscription = interval(10000).subscribe(
      () => this.updateServiceList()
    );
  }

  updateServiceList(): void {
    this.route.params.subscribe((params) => {
      this.serviceService
        .servicesInfoServicetypeServicenameGet(params.serviceType, params.serivceName)
        .subscribe({
          next: (services) => {
            this.service = services.services[0];
          },
        });
    });

  }

  ngAfterViewInit(): void {
    ace.config.set('fontSize', '14px');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setMode('ace/mode/yaml');
    this.aceEditor.setReadOnly(true);
  }

  open(): void{
    this.serviceService.servicesYamlServicetypeServicenameGet(
      this.service.type, this.service.name).subscribe({
      next: (dtosServiceYamlDto) => {
        this.aceEditor.session.setValue(dtosServiceYamlDto.yaml);
      },
    });
  }

  deleteService(): void {
    this.serviceService.servicesServicetypeServicenameDelete(
      this.service.type,
      this.service.name).subscribe({
      next: () => {
        this.notification.add(
          new Notification(
            NotificationType.Info,
            this.service.name + ': Service successful deleted.',
            ' Type: ' + this.service.type +
            ' Service Name: ' + this.service.name +
            ': Service successful deleted.',
          ));
        this.router.navigate(['main/services']);
      },
      error: msg => {console.log(msg); }
    });
  }

  displayAction(selectedAction: DtosServiceInstanceActionDto): void {
    this.actionModal.displayAction(this.service, selectedAction);
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
