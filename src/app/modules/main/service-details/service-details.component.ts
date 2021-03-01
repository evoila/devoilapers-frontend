import { Router } from '@angular/router';
import {
  AfterViewInit,
  Component,
  ElementRef,
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
} from '../../../rest';
import * as ace from 'ace-builds';
import 'ace-builds/webpack-resolver';
import {ActionModalComponent} from '../action-modal/action-modal.component';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
})
export class ServiceDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') private editor: ElementRef<HTMLElement>;
  @ViewChild(ActionModalComponent) actionModal: ActionModalComponent;

  aceEditor: any;
  service: DtosServiceInstanceDetailsDto = {};
  openModal = false;
  openEditorModal = false;
  openDeleteModal = false;

  selectedAction: DtosServiceInstanceActionDto
  serviceName: string
  serviceType: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviceService: ServiceService,
  ) {
    this.selectedAction = new class implements DtosServiceInstanceActionDto {
      command: string;

    }
  }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.serviceService
        .servicesInfoServicetypeServicenameGet(params.serviceType, params.serivceName)
        .subscribe({
          next: (services) => {
            this.service = services.services[0];
          },
          error: (msg) => {
            console.log(msg);
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
      error: msg => {console.log(msg); }
    });
  }

  deleteService(): void {
    this.serviceService.servicesServicetypeServicenameDelete(
      this.service.type,
      this.service.name).subscribe({
      next: () => {
        this.router.navigate(['main/services']);
      },
      error: msg => {console.log(msg); }
    });
  }

  displayAction(selectedAction: DtosServiceInstanceActionDto): void {
    this.actionModal.displayAction(this.service, selectedAction);
  }
}
