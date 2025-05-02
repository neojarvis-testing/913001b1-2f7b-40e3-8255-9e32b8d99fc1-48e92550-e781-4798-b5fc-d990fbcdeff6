import { NgModule } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ManagernavComponent } from './components/managernav/managernav.component';
import { HomeComponent } from './components/home/home.component';
import { ManagerviewallaccountsComponent } from './components/managerviewallaccounts/managerviewallaccounts.component';
import { ManagerviewalltransactionsComponent } from './components/managerviewalltransactions/managerviewalltransactions.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CustomernavComponent } from './components/customernav/customernav.component';
import { CustomeraddaccountComponent } from './components/customeraddaccount/customeraddaccount.component';
import { CustomerviewaccountComponent } from './components/customerviewaccount/customerviewaccount.component';
import { CustomerviewfeedbackComponent } from './components/customerviewfeedback/customerviewfeedback.component';
import { CustomeraddfeedbackComponent } from './components/customeraddfeedback/customeraddfeedback.component';

const routes: Routes = [
  {path:'', component: HomeComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'customer/home', component:HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'customernav', component: CustomernavComponent },
  { path: 'managernav', component: ManagernavComponent },
  { path: 'customer/account', component: CustomeraddaccountComponent },
  { path: 'customerviewaccount', component: CustomerviewaccountComponent },
  {path:'my-feedbacks', component:CustomerviewfeedbackComponent},
  { path: 'manager/home', component: HomeComponent },
  { path: 'manager/accounts', component: ManagerviewallaccountsComponent },
  { path: 'manager/transactions', component: ManagerviewalltransactionsComponent },
  { path: 'manager/feedbacks', component: ManagerviewfeedbackComponent },
  { path: 'customer/feedback', component: CustomeraddfeedbackComponent},
  { path : 'customerviewfeedback', component: CustomerviewfeedbackComponent},
  { path : 'managerviewfeedback', component : ManagerviewfeedbackComponent},
  {path:'customer-view-feedback',component:CustomerviewfeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Register the routes
  exports: [RouterModule],                 // Export the RouterModule for use in AppModule
})
export class AppRoutingModule {}
