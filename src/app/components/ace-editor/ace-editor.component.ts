import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/webpack-resolver';

@Component({
  selector: 'app-ace-editor',
  // Bind the "mySchema" member to the schema string of the Form component.
  templateUrl: './ace-editor.component.html',
  styleUrls: ['./ace-editor.component.scss'],
})
export class AceEditorComponent implements AfterViewInit {
  @ViewChild('editor') private editor: ElementRef<HTMLElement>;

  @Input()
  get yaml(): string {
      return this._yaml;
  }

  set yaml(value: string) {
    this._yaml = value ?? '';
    this.setYamlToEditorComponent(value);
  }

  @Output() textChanged = new EventEmitter<string>();

  _yaml: string;
  aceEditor: any;

  constructor() { }

  private setYamlToEditorComponent(yaml: string): void {
    if (this.aceEditor === undefined) {
      return;
    }

    this.aceEditor.session.setValue(yaml);
  }

  ngAfterViewInit(): void {
    ace.config.set('fontSize', '14px');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setMode('ace/mode/yaml');

    this.aceEditor.on('change', () => {
      const text = this.aceEditor.getValue();
      this._yaml = text;
      this.textChanged.emit(text);
    });

    this.setYamlToEditorComponent(this.yaml);
  }
}
