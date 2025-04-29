import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomernavComponent } from './components/customernav/customernav.component';

const routes: Routes = [
  {path:"customernav",component:CustomernavComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
