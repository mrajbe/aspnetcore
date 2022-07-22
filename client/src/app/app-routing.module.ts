import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiDocumentComponent } from './api-document/api-document.component';
import { ListUsersComponent } from './users/list-users/list-users.component';

const routes: Routes = [
  {path:'', component: ListUsersComponent},
  {path:'docs', component: ApiDocumentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
