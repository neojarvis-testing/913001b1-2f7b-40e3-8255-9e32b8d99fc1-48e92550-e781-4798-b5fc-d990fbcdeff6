import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { CustomernavComponent } from './components/customernav/customernav.component';
import { CustomeraddaccountComponent } from './components/customeraddaccount/customeraddaccount.component';
import { CustomerviewaccountComponent } from './components/customerviewaccount/customerviewaccount.component';
import { CustomerviewfeedbackComponent } from './components/customerviewfeedback/customerviewfeedback.component';
import { CustomeraddfeedbackComponent } from './components/customeraddfeedback/customeraddfeedback.component';
import { ManagernavComponent } from './components/managernav/managernav.component';
import { ManagerviewallaccountsComponent } from './components/managerviewallaccounts/managerviewallaccounts.component';
import { ManagerviewalltransactionsComponent } from './components/managerviewalltransactions/managerviewalltransactions.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route redirects to login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  // Customer section with child routes
  {
    path: 'customer',
    component: CustomernavComponent, // Customernav as the parent component
    children:
    [
      { path: 'home', component: HomeComponent },
      { path: 'account', component: CustomeraddaccountComponent },
      { path: 'view-account', component: CustomerviewaccountComponent },
      { path: 'view-feedback', component: CustomerviewfeedbackComponent },
      { path: 'add-feedback', component: CustomeraddfeedbackComponent }
    ]
  },

  // Manager section with child routes
  {
    path: 'manager',
    component: ManagernavComponent, // Managernav as the parent component
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'accounts', component: ManagerviewallaccountsComponent },
      { path: 'transactions', component: ManagerviewalltransactionsComponent },
      { path: 'feedbacks', component: ManagerviewfeedbackComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Register the routes
  exports: [RouterModule]                 // Export RouterModule for use in the AppModule
})
export class AppRoutingModule {}
 
 