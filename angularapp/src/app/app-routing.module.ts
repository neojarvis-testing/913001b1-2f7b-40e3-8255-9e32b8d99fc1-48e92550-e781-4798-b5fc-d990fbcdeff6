import { NgModule } from '@angular/core';

import { Routes } from '@angular/router';
 
import { LoginComponent } from './components/login/login.component';
import { ManagernavComponent } from './components/managernav/managernav.component';
import { HomeComponent } from './components/home/home.component';
import { ManagerviewallaccountsComponent } from './components/managerviewallaccounts/managerviewallaccounts.component';
import { ManagerviewalltransactionsComponent } from './components/managerviewalltransactions/managerviewalltransactions.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
 
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
 
  // Manager navigation
  {
    path: 'manager',
    component: ManagernavComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'accounts', component: ManagerviewallaccountsComponent },
      { path: 'transactions', component: ManagerviewalltransactionsComponent },
      { path: 'feedbacks', component: ManagerviewfeedbackComponent }
    ]
  },
];
 

import { Routes, RouterModule } from '@angular/router';
import { CustomeraddaccountComponent } from './components/customeraddaccount/customeraddaccount.component';


const routes: Routes = [
 
];

import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:"register",component:RegistrationComponent},
  {path:"login",component:LoginComponent}

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 