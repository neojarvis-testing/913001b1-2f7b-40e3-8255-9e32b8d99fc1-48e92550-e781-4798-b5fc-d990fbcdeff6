import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomeraddfeedbackComponent } from './components/customeraddfeedback/customeraddfeedback.component';
import { CustomerviewfeedbackComponent } from './components/customerviewfeedback/customerviewfeedback.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';

const routes: Routes = [
  { path: 'customeraddfeedback', component: CustomeraddfeedbackComponent},
  { path : 'customerviewfeedback', component: CustomerviewfeedbackComponent},
  { path : 'managerviewfeedback', component : ManagerviewfeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
