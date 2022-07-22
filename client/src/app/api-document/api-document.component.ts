import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SwaggerUI from 'swagger-ui';
import customerApiDoc from "./swagger.json";

@Component({
  selector: 'app-api-document',
  templateUrl: './api-document.component.html',
  styleUrls: ['./api-document.component.css']
})
export class ApiDocumentComponent implements OnInit {
//AfterContentInit
  ngOnInit() {
    const apiDocumentation = customerApiDoc;
    SwaggerUI({
        domNode: document.getElementById('swagger-ui-item'),
        spec: apiDocumentation
      });
}
  // @ViewChild('customerapidocumentation',{static: true}) custApiDocElement: ElementRef | undefined
  // constructor() { }
  // ngAfterContentInit(): void {
  //   const apiDocumentation = customerApiDoc;
  //   const ui = SwaggerUI({
  //     spec: apiDocumentation,
  //     domNode: this.custApiDocElement?.nativeElement,
  //   })
  // }


}

