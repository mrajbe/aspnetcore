import { Injectable, OnInit } from '@angular/core';
import jsonQuery from 'json-query';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import swaggerJson from '../data/swagger.json'
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

  getMethod(url, name)
  {
    var method;
    for (let [key, value] of Object.entries(this.data.paths)) 
    {
      if(key == url)
      {
        method = value[name];
        return method;
      }
    }
    return;

  }

  getMethods(tag, path) {
    var methods = new Array()
    for (let method of this.verbs) {
      if (path[method] && path[method].tags.indexOf(tag) != -1) {
        methods.push({ name: method, value: path[method] });
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
        children.push(...this.getChildren(path))
      }
      var menu = { name:tag, children: children} 
      menuTree.push(menu)

    }
    return menuTree;
  }

  getChildren(path)
  {
    var children = new Array();
    for(let method of path.methods)
    {
      var child = {
        url: path.name,
        name: method.value.summary,
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
