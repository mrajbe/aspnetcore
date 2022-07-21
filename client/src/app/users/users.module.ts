import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersComponent } from './list-users/list-users.component';

@NgModule({
  declarations: [
    ListUsersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListUsersComponent
  ]
})
export class UsersModule { }
