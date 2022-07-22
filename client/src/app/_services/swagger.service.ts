import { Injectable, OnInit } from '@angular/core';
import jsonQuery from 'json-query';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import swaggerJson from '../data/swagger.json'
@Injectable({
  providedIn: 'root'
})
export class SwaggerService implements OnInit {
  data: any ;
  testData = {people: [
    {name: 'Matt', country: 'NZ'},
    {name: 'Pete', country: 'AU'},
    {name: 'Mikey', country: 'NZ'}
  ]};
  tags = new Array();
  //jsonQuery = require('json-query');
  constructor(private http : HttpClient) {

    this.getSwaggerJson().subscribe(
      {
        next: response => {
          this.data = response;
        },
        error: error => {
          console.log(error);
        }

    }
      
    )

   }

  ngOnInit(): void {
  }

  getAllTags(): string[] {
    for (let [key, value] of Object.entries(this.data.paths)) {
      this.deepIterator(value);
    }

    return Array.from(new Set(this.tags));;
  }

  public getSwaggerJson() : Observable<any>
  {
    return new Observable(observer => observer.next(swaggerJson))
    //return this.http.get('../data/swagger.json');
  }

  getApis(tags: string)
  {
    //jsonQuery('people[country=NZ].name'), {data : this.testData};
    console.log(jsonQuery('people[country=NZ].name'), {data : this.testData})
  }

  deepIterator (target) {
    if (typeof target === 'object') {
      for (const key in target) {
        //console.log(key);
        if(key =='tags'){
         
          this.tags.push(...target[key])
          
          return;

        }
        this.deepIterator(target[key]);
        
      }
    } else {
      //console.log(target);
    }
  }

}
