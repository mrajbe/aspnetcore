import { SwaggerService } from '../../services/swagger.service';
import { Component, OnInit,  } from '@angular/core';
import SwaggerUI from 'swagger-ui';

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.css']
})
export class SwaggerComponent implements OnInit {

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
}
