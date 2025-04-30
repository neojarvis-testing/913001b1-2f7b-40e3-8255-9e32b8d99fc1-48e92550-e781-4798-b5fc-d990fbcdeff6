import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CustomeraddfeedbackComponent } from './components/customeraddfeedback/customeraddfeedback.component';
import { CustomerviewfeedbackComponent } from './components/customerviewfeedback/customerviewfeedback.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';


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

const routes: Routes = [
  {path:'', component: HomeComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'customernav', component: CustomernavComponent },
  { path: 'managernav', component: ManagernavComponent },
  { path: 'customer/account', component: CustomeraddaccountComponent },
  { path: 'customerviewaccount', component: CustomerviewaccountComponent },

  // Manager-related routes as direct paths
  { path: 'manager/home', component: HomeComponent },
  { path: 'manager/accounts', component: ManagerviewallaccountsComponent },
  { path: 'manager/transactions', component: ManagerviewalltransactionsComponent },
  { path: 'manager/feedbacks', component: ManagerviewfeedbackComponent },
    { path: 'customeraddfeedback', component: CustomeraddfeedbackComponent},
  { path : 'customerviewfeedback', component: CustomerviewfeedbackComponent},
  { path : 'managerviewfeedback', component : ManagerviewfeedbackComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Register the routes
  exports: [RouterModule],                 // Export the RouterModule for use in AppModule
})
export class AppRoutingModule {}
