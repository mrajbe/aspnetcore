import { FlatTreeControl, NestedTreeControl } from "@angular/cdk/tree";
import { Component } from "@angular/core";
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from "@angular/material/tree";
import { ExampleFlatNode } from "./ExampleFlatNode";
import { INode } from "./INode";


@Component({
  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.css'],
})
export class NavComponent {
  private _transformer = (node: INode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      method: node.method,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  getColor(method) {
    
    switch (method) {
      case 'Get':
        return 'green';
      case 'Post':
        return 'blue';
      case 'Delete':
        return 'red';
      default:
        return 'grey';

    }
  }
  
}

const TREE_DATA: INode[] = [
  {
    name: 'Getting Started',
    children: [{name: 'Introduction'}, {name: 'Authentication'}, {name: 'Regions'}],
  },
  {
    name: 'Account',
    children: [
      {
        name: 'Get Details' ,
        method: 'Get'     
      },
      {
        name: 'Get Created List',
        method: 'Get'
      },
      {
        name: 'Mark as Favorite',
        method: 'Post'
      },
    ],
  },
  {
    name: 'Authentication',
    children: [
      {
        name: 'How do I generate a session id?'
      }, 
      {
        name: 'Create Guest Session Id',
        method: 'Post'
      }, 
      {
        name: 'Delete Session',
        method: 'Delete'
      }
  ],
  }
];