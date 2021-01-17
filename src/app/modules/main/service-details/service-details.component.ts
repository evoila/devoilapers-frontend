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
  DtosServiceInstanceDetailsDto,
  ServiceService
} from 'src/app/rest';
import * as ace from 'ace-builds';
import 'ace-builds/webpack-resolver';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
})
export class ServiceDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') private editor: ElementRef<HTMLElement>;

  aceEditor: any;
  service: DtosServiceInstanceDetailsDto = {};
  openModal: boolean = false;
  openEditorModal: boolean = false;
  openDeleteModal: boolean = false;
  selectedComand: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.serviceService
        .servicesInfoServiceidGet(params['serviceId'])
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
  }

  selectAction(command) {
    this.selectedComand = command;
    this.openModal = true;
  }

  executeAction() {
    this.serviceService
      .servicesActionServiceidActioncommandPost(
        this.service.id,
        this.selectedComand
      )
      .subscribe({
        next: () => {
          this.openModal = false;
        },
        error: (msg) => {
          console.log(msg);
        },
      });
  }

  updateYAML() {
    this.serviceService
      .servicesUpdateServiceidPost(this.aceEditor.getValue(), this.service.name)
      .subscribe({
        next: (dtosServiceStoreItemYamlDto) => {
          this.aceEditor.session.setValue(dtosServiceStoreItemYamlDto.yaml);
        },
      });
  }

  open() {
    this.serviceService.servicesYamlServiceidGet(this.service.id).subscribe({
      next: (dtosServiceYamlDto) => {
        this.aceEditor.session.setValue(dtosServiceYamlDto.yaml);
      },
      error: msg => {console.log(msg)}
    });
  }

  deleteService() {
    this.serviceService.servicesServiceidDelete(this.service.id).subscribe({
      next: () => { 
        this.router.navigate(['main/services']); 
      },
      error: msg => {console.log(msg)}
    })
  }
}