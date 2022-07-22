import { Component, OnInit } from '@angular/core';
import { SwaggerService } from '../_services/swagger.service';

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.css']
})
export class SwaggerComponent implements OnInit {

  //data: any = swaggerData;
  tags: any;
  constructor(private swaggerService : SwaggerService) { }
 // paths = Object.keys(this.data.paths)
  ngOnInit() {
    this.tags = this.swaggerService.getAllTags()
    this.swaggerService.getApis('');
  }
  

  

}
