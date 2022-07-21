import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  versions: any[] = [
    {value: '1.0', viewValue: '1.0'},
    {value: '1.1', viewValue: '1.1'},
    {value: '2.0', viewValue: '2.0'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
