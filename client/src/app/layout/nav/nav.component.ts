import { FlatTreeControl } from "@angular/cdk/tree";
import { Component } from "@angular/core";
import { DynamicDataSource } from "src/app/_services/dynamic-data-source";
import { DynamicDatabaseService } from "src/app/_services/dynamic-database.service";
import { DynamicFlatNode } from "src/app/_services/dynamic-flat-node";

@Component({
  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.css'],
})
export class NavComponent {
  constructor(database: DynamicDatabaseService) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);

    this.dataSource.data = database.initialData();
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
}