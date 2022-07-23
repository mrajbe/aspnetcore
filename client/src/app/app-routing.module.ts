import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwaggerComponent } from './feature/swagger/swagger.component';
import { ListUsersComponent } from './users/list-users/list-users.component';

const routes: Routes = [
  {path:'', component: ListUsersComponent},
  {path:'docs', component: SwaggerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
