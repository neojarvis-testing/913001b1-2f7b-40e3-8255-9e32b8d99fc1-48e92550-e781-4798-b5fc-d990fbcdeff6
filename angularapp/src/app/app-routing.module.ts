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
 
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {path:'customernav',component:CustomernavComponent},
  {path:'managernav',component:ManagernavComponent},
  {path:'customer/account',component:CustomeraddaccountComponent},
  {path:'customerviewaccount',component:CustomerviewaccountComponent},
 
  // Manager navigation
  {
    path: 'manager',
    component: ManagernavComponent,
    children: [
     
      { path: 'home', component: HomeComponent },
      { path: 'accounts', component: ManagerviewallaccountsComponent },
      { path: 'transactions', component: ManagerviewalltransactionsComponent },
      { path: 'feedbacks', component: ManagerviewfeedbackComponent },
    ],
  },
];
 
 
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
 