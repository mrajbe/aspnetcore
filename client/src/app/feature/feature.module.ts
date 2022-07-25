import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatDividerModule,
    MatListModule
  ],
  exports:[
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatDividerModule,
    MatListModule
  ],
  declarations: []
})
export class FeatureModule { }
