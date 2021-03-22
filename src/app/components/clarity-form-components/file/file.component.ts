import { Component, AfterViewInit } from '@angular/core';
import { FileWidget } from 'ngx-schema-form';
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent extends FileWidget implements AfterViewInit {
  filename: string;


  ngAfterViewInit(): void {
    // OVERRIDE ControlWidget ngAfterViewInit() as ReactiveForms do not handle
    // file inputs
    const control = this.control;
    this.formProperty.errorsChanges.subscribe((errors) => {
      control.setErrors(errors, { emitEvent: true });
    });

    this.reader.onloadend = () => {
      this.filedata = window.btoa((this.reader.result as string));
      this.formProperty.setValue(this.filedata, false);
    };
  }

  onFileChange($event): void {
    const file = $event.target.files[0];
    this.filename = file.name;
    this.reader.readAsBinaryString(file);
  }
}
