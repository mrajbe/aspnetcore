import { Injectable, OnInit } from '@angular/core';
import jsonQuery from 'json-query';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import swaggerJson from '../data/swagger.json'
import { Method } from '../dto/method';
@Injectable({
  providedIn: 'root'
})
export class SwaggerService implements OnInit {
  data: any;
  testData = {
    people: [
      { name: 'Matt', country: 'NZ' },
      { name: 'Pete', country: 'AU' },
      { name: 'Mikey', country: 'NZ' }
    ]
  };
  verbs = ['get', 'post', 'put', 'patch', 'delete', 'options']
  tags = new Array();
  //jsonQuery = require('json-query');
  constructor(private http: HttpClient) {

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

  public getSwaggerJson(): Observable<any> {
    return new Observable(observer => observer.next(swaggerJson))
   // return this.http.get('https://petstore.swagger.io/v2/swagger.json');
  }

  getApis(tag: string) {
    var paths = new Array();
    for (let [key, value] of Object.entries(this.data.paths)) {
      if (!this.hasTag(tag, value)) {
        continue;
      }
      var methods = this.getMethods(tag, value);
      var path = {
        name: key,
        methods: methods
      }
      paths.push(path)
    }


    console.log(paths);
    return paths;
    //jsonQuery('people[country=NZ].name'), {data : this.testData};
    //console.log(jsonQuery('people[country=NZ].name'), {data : this.testData})

  }

  getMethod(tag, url, name) : Method
  {
    var method : Method;
    for (let [key, value] of Object.entries(this.data.paths)) 
    {
      if(key == url)
      {
        method = {
          name: name,
          tag: tag,
          url : url, 
          summary: value[name].summary,
          description: value[name].summary,
          operationId: value[name].operationId,
          consumes:    value[name].consumes,
          produces:    value[name].produces,
          parameters:  value[name].parameters,
          responses:   value[name].responses 
        };
        return method;
      }
    }
    return;

  }

  getMethods(tag, path) : Method[] {
    var methods = new Array<Method>()
    for (let method of this.verbs) {
      if (path[method] && path[method].tags.indexOf(tag) != -1) {
        path[method].name =  method;
        methods.push(path[method] );
      }
    }
    return methods;

  }

  hasTag(tag, path) {
    for (let method of this.verbs) {
      if (path[method] && path[method].tags.indexOf(tag) != -1) {
        return true;
      }
    }
    return false;

  }

  getMenu() : Array<any>
  {
    var menuTree = new Array();
    var tags = this.getAllTags();
    for(let tag of tags)
    {
      var children = new Array();
      var paths = this.getApis(tag);
      
      for(let path of paths)
      {
        children.push(...this.getChildren(tag, path))
      }
      var menu = { name:tag, children: children} 
      menuTree.push(menu)

    }
    return menuTree;
  }

  getChildren(tag, path)
  {
    var children = new Array();
    for(let method of path.methods)
    {
      var child = {
        url: path.name,
        tag: tag,
        name: method.summary,
        method: method.name
      }
      children.push(child);
    }
    return children;
  }

  deepIterator(target) {
    if (typeof target === 'object') {
      for (const key in target) {
        //console.log(key);
        if (key == 'tags') {

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
