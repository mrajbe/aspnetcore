import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SwaggerUI from 'swagger-ui';
import { SwaggerService } from '../../services/swagger.service';

@Component({
  selector: 'app-api-document',
  templateUrl: './api-document.component.html',
  styleUrls: ['./api-document.component.css']
})
export class ApiDocumentComponent implements OnInit {
  method;

  constructor(private swaggerService:SwaggerService,private activatedRoute : ActivatedRoute) { 
    // this.apiDoc = this.router.getCurrentNavigation().extras.state;
    // console.log(this.apiDoc);
  }

//AfterContentInit
  ngOnInit() {
    var customerApiDoc ;
    this.activatedRoute.queryParamMap.subscribe(
      {
        next: response => {
          this.method = this.swaggerService.getMethod(response['params'].url, response['params'].method);
          console.log(this.method);
        },
        error: error => {
          console.log(error);
        }
      }
    )

}


}

