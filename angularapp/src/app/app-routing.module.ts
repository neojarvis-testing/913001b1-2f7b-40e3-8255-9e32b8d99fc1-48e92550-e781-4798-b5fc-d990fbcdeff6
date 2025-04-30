import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomeraddaccountComponent } from './components/customeraddaccount/customeraddaccount.component';

const routes: Routes = [
  {path:"",component:CustomeraddaccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
