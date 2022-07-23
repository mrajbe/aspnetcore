import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SwaggerUI from 'swagger-ui';
import { SwaggerService } from '../../services/swagger.service';

@Component({
  selector: 'app-api-document',
  templateUrl: './api-document.component.html',
  styleUrls: ['./api-document.component.css']
})
export class ApiDocumentComponent implements OnInit {

  constructor(private swaggerService : SwaggerService) { }

//AfterContentInit
  ngOnInit() {
    var customerApiDoc ;
    this.swaggerService.getSwaggerJson().subscribe(
      {
        next: response => {
         customerApiDoc = response
        },
        error: error => {
          console.log(error);
        }
      }
    )
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

