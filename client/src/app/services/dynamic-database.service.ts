import { Injectable } from '@angular/core';
import { DynamicFlatNode } from './dynamic-flat-node';

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
 @Injectable({providedIn: 'root'})
 export class DynamicDatabaseService {
   dataMap = new Map<string, string[]>([     
     ['Getting Started', ['Introduction', 'Authentication ', 'Regions']],
     ['Account', ['Get Details', 'Get Created Lists', 'Mark as Favorite']],
     ['Authentication', ['How do I generate Session ID', 'Create Guest Session', 'Create Request Token']],
     ['Posts', ['Get All Posts', 'Get a Single Post', 'Get Posts of an User']]
   ]);
 
   rootLevelNodes: string[] = ['Getting Started', 'Account', 'Authentication','Posts'];
 
   /** Initial data from database */
   initialData(): DynamicFlatNode[] {
     return this.rootLevelNodes.map(name => new DynamicFlatNode({value:name, href:"#"}, 0, true));
   }
 
   getChildren(node: string): string[] | undefined {
     return this.dataMap.get(node);
   }
 
   isExpandable(node: string): boolean {
     return this.dataMap.has(node);
   }
 }
