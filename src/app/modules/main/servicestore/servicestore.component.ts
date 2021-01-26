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
} from 'src/app/rest';
import * as ace from "ace-builds";
import 'ace-builds/webpack-resolver';

@Component({
  selector: 'app-servicestore',
  templateUrl: './servicestore.component.html',
  styleUrls: ['./servicestore.component.scss'],
  providers: [ServicestoreService, ServiceService]
})
export class ServicestoreComponent implements OnInit, AfterViewInit {
  @ViewChild("editor") private editor: ElementRef<HTMLElement>;
  
  services:  Array<DtosServiceStoreItemDto>;
  serviceName: string;
  wizardYAML: string;
  aceEditor: any;

  constructor(private servicestoreService: ServicestoreService,
              private serviceService: ServiceService) { }

  ngOnInit() {
    this.servicestoreService.servicestoreInfoGet().subscribe({
      next: services => {this.services = services.services},
      error: msg => {console.log(msg)}
    });
  }
  
  finish(){
    let dtosServiceYamlDto = {
      yaml: this.aceEditor.getValue()
    } as DtosServiceYamlDto;
    this.serviceService.servicesCreateServicetypePost(
      dtosServiceYamlDto, this.serviceName).subscribe({
        next: dtosServiceStoreItemYamlDto => {
          this.aceEditor.session.setValue(dtosServiceStoreItemYamlDto.yaml);
        }
    });
    }

  open(serviceName){
    this.serviceName=serviceName;
    this.servicestoreService.servicestoreYamlServicetypeGet(this.serviceName)
      .subscribe({
          next: dtosServiceStoreItemYamlDto => {
            this.aceEditor.session.setValue(dtosServiceStoreItemYamlDto.yaml);
          }
      });
  }

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setMode("ace/mode/yaml");
  }
}
