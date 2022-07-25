import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utility } from 'src/app/shared/utility';
import SwaggerUI from 'swagger-ui';
import { SwaggerService } from '../../services/swagger.service';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { ParameterGroup } from 'src/app/dto/parameter-group';
import { Method } from 'src/app/dto/method';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-api-document',
  templateUrl: './api-document.component.html',
  styleUrls: ['./api-document.component.css']
})
export class ApiDocumentComponent implements OnInit {
  method : Method;
  parameterGroups : ParameterGroup[];
  displayedColumns: string[] = ['name', 'type', 'description', 'required'];
  dataSource = ELEMENT_DATA;
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
          this.method = this.swaggerService.getMethod(response['params'].tag, response['params'].url, response['params'].method);
          this.parameterGroups = this.getParameterGroups(this.method);
          console.log(this.method);
        },
        error: error => {
          console.log(error);
        }
      }
    )



}

getParameterGroups(method) : ParameterGroup[]
{

  return this.swaggerService.getParameterGroups(method);

}

getColor(method)
{
  return Utility.getColor(method);

}


}

