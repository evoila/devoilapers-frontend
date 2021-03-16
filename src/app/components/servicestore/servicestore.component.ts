import {
  AfterViewInit,
  Component,
  ElementRef, OnDestroy,
  OnInit, QueryList,
  ViewChild
} from '@angular/core';
import {
  ServicestoreService,
  DtosServiceStoreItemDto,
  ServiceService,
  DtosServiceYamlDto, DtosServiceStoreItemFormDto,
} from 'src/app/share/swagger-auto-gen';
import * as ace from 'ace-builds';
import 'ace-builds/webpack-resolver';
import {NotificationService} from '../../services/notification/notification.service';
import * as arraySort from 'array-sort'
import {Outlet} from '../../services/notification/outlet';
import {NotificationType} from '../../services/notification/notificationtype';
import {Notification} from '../../services/notification/notification';
import {ClrWizard, ClrWizardPage} from '@clr/angular';

@Component({
  selector: 'app-servicestore',
  templateUrl: './servicestore.component.html',
  styleUrls: ['./servicestore.component.scss'],
  providers: [ServicestoreService, ServiceService]
})
export class ServicestoreComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editor') private editor: ElementRef<HTMLElement>;
  @ViewChild('wizard') wizard: ClrWizard;
  // @ViewChild('pageOne') pageOne: ClrWizardPage;

  services: Array<DtosServiceStoreItemDto>;

  jsonFormPageNavTitles: string[];
  jsonForm: any;
  formResult: Object;

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
    }

  open(serviceName): void{
    this.notificationService.close();
    this.notificationService.useOutletOnSuccess(Outlet.global);
    this.notificationService.useOutletOnError(Outlet.editorModal);

    this.serviceType = serviceName;
    this.getFormJSON();
    // this.wizard.currentPage=this.pageOne;
    this.wizard.open();

    // this.wizard.pageCollection.pages = new QueryList<ClrWizardPage>();
    //
    // let newPage =       new ClrWizardPage(
    //   this.wizard.navService,
    //   this.wizard.pageCollection,
    //   this.wizard.buttonService
    // );
    //
    // newPage.id
    //
    // this.wizard.pageCollection.pages.reset([
    //   this.wizard.pageCollection.pages.toArray(),
    //   newPage
    // ])
    // console.log();
  }

  onResultJsonChange(formResult: Object){
    this.formResult = formResult;
  }

  getFormJSON(): void {
    this.servicestoreService.servicestoreFormServicetypeGet(this.serviceType)
      .subscribe({
        next: (dtosServiceStoreItemYamlDto: DtosServiceStoreItemFormDto) => {
          this.jsonForm = JSON.parse(dtosServiceStoreItemYamlDto.formJson);

          //For testing
          this.jsonForm = this.getTestFormObject();

          let fromPropertirs = this.jsonForm.properties;
          this.jsonFormPageNavTitles = Object.keys(fromPropertirs);
        }
      });
  }

  getPagefromForm(pageName): object {
    // console.log(this.jsonForm.properties[pageName])
    return this.jsonForm.properties[pageName];
  }

  setEditorYAML(): void{
    this.servicestoreService
      .servicestoreYamlServicetypePost(JSON.stringify(this.formResult),this.serviceType)
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

  getTestFormObject(): object{
    return {
      "properties":{
        "common":{
          "type":"object",
          "description":"Common settings",
          "properties":{
            "cluster_name":{
              "type":"string",
              "title":"Cluster name",
              "widget":{
                "id":"string"
              }
            },
            "user_name":{
              "type":"string",
              "title":"Database user name",
              "widget":{
                "id":"string"
              },
              "default":"Maintainer"
            },
            "in_cluster_port":{
              "type":"number",
              "title":"Cluster internal database port",
              "widget":{
                "id":"string"
              },
              "default":5432
            },
            "cluster_storage_size":{
              "type":"number",
              "title":"Database storage size in GB",
              "widget":{
                "id":"string"
              },
              "default":1
            }
          }
        },
        "tls":{
          "type":"object",
          "description":"TLS options",
          "properties":{
            "use_tls":{
              "type":"boolean",
              "widget":{
                "id":"checkbox"
              },
              "description":"Use in cluster tls",
              "default":true
            },
            "tls_mode":{
              "type":"string",
              "default":"FromFile",
              "widget":{
                "id":"radio"
              },
              "oneOf":[
                {
                  "enum":[
                    "FromFile"
                  ],
                  "description":"Certificate from file"
                },
                {
                  "enum":[
                    "FromSecret"
                  ],
                  "description":"Certificate from kubernetes secret"
                }
              ],
              "visibleIf":{
                "use_tls":[
                  true
                ]
              }
            },
            "tls_mode_from_secret":{
              "type":"object",
              "properties":{
                "ca_secret":{
                  "type":"string",
                  "title":"CA kubernetes secret",
                  "widget":{
                    "id":"string"
                  }
                },
                "tls_secret":{
                  "type":"string",
                  "title":"TLS keypair kubernetes secret",
                  "widget":{
                    "id":"string"
                  }
                }
              },
              "visibleIf":{
                "tls_mode":[
                  "FromSecret"
                ]
              }
            },
            "tls_mode_from_file":{
              "type":"object",
              "name":"",
              "properties":{
                "ca_cert":{
                  "type":"string",
                  "title":"Choose CA certificate",
                  "widget":{
                    "id":"file"
                  }
                },
                "tls_private_key":{
                  "type":"string",
                  "title":"Choose TLS private key",
                  "widget":{
                    "id":"file"
                  }
                },
                "tls_certificate":{
                  "type":"string",
                  "title":"Choose TLS certificate",
                  "widget":{
                    "id":"file"
                  }
                }
              },
              "visibleIf":{
                "tls_mode":[
                  "FromFile"
                ]
              }
            }
          }
        },
        "backup":{
          "type":"object",
          "description":"Backup options",
          "properties":{
            "perform_backup":{
              "type":"boolean",
              "widget":{
                "id":"checkbox"
              },
              "description":"Perform Backrest AWS S3 Backups",
              "default":true
            },
            "common_s3_data":{
              "type":"object",
              "description":"S3 Backup informations",
              "properties":{
                "s3_bucket_name":{
                  "type":"string",
                  "title":"S3 Bucket name",
                  "widget":{
                    "id":"string"
                  }
                },
                "s3_endpoint":{
                  "type":"string",
                  "title":"S3 Endpoint",
                  "widget":{
                    "id":"string"
                  }
                },
                "s3_region":{
                  "type":"string",
                  "title":"S3 Region",
                  "widget":{
                    "id":"string"
                  }
                }
              },
              "visibleIf":{
                "perform_backup":[
                  true
                ]
              }
            },
            "backup_mode":{
              "type":"string",
              "default":"FromNewS3Credentials",
              "widget":{
                "id":"radio"
              },
              "oneOf":[
                {
                  "enum":[
                    "FromNewS3Credentials"
                  ],
                  "description":"New S3 credentials"
                },
                {
                  "enum":[
                    "FromS3Secret"
                  ],
                  "description":"S3 Credentials from kubernetes secret"
                }
              ],
              "visibleIf":{
                "perform_backup":[
                  true
                ]
              }
            },
            "backup_mode_from_secret":{
              "type":"object",
              "properties":{
                "s3_key":{
                  "type":"string",
                  "title":"S3 Key kubernetes secret",
                  "widget":{
                    "id":"string"
                  }
                },
                "s3_secret":{
                  "type":"string",
                  "title":"S3 Secret kubernetes secret",
                  "widget":{
                    "id":"string"
                  }
                }
              },
              "visibleIf":{
                "backup_mode":[
                  "FromS3Secret"
                ]
              }
            },
            "backup_mode_from_new_credentials":{
              "type":"object",
              "properties":{
                "s3_key":{
                  "type":"string",
                  "title":"S3 Key",
                  "widget":{
                    "id":"string"
                  }
                },
                "s3_secret":{
                  "type":"string",
                  "title":"S3 Secret",
                  "widget":{
                    "id":"string"
                  }
                }
              },
              "visibleIf":{
                "backup_mode":[
                  "FromNewS3Credentials"
                ]
              }
            }
          }
        }
      }
    }
  }
}
