import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
 
=======
>>>>>>> 53773a2a223158b980469ffe0758737f25a20f12
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { CustomernavComponent } from './components/customernav/customernav.component';
import { CustomeraddaccountComponent } from './components/customeraddaccount/customeraddaccount.component';
import { CustomerviewaccountComponent } from './components/customerviewaccount/customerviewaccount.component';
<<<<<<< HEAD
 
=======
import { CustomerviewfeedbackComponent } from './components/customerviewfeedback/customerviewfeedback.component';
import { CustomeraddfeedbackComponent } from './components/customeraddfeedback/customeraddfeedback.component';
import { ManagernavComponent } from './components/managernav/managernav.component';
import { ManagerviewallaccountsComponent } from './components/managerviewallaccounts/managerviewallaccounts.component';
import { ManagerviewalltransactionsComponent } from './components/managerviewalltransactions/managerviewalltransactions.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';

>>>>>>> 53773a2a223158b980469ffe0758737f25a20f12
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route redirects to login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
<<<<<<< HEAD
  {path:'customernav',component:CustomernavComponent},
  {path:'managernav',component:ManagernavComponent},
  {path:'customer/account',component:CustomeraddaccountComponent},
  {path:'customerviewaccount',component:CustomerviewaccountComponent},
 
  // Manager navigation
=======

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
>>>>>>> 53773a2a223158b980469ffe0758737f25a20f12
  {
    path: 'manager',
    component: ManagernavComponent, // Managernav as the parent component
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'accounts', component: ManagerviewallaccountsComponent },
      { path: 'transactions', component: ManagerviewalltransactionsComponent },
<<<<<<< HEAD
      { path: 'feedbacks', component: ManagerviewfeedbackComponent },
    ],
  },
];
 
=======
      { path: 'feedbacks', component: ManagerviewfeedbackComponent }
    ]
  }
];

>>>>>>> 53773a2a223158b980469ffe0758737f25a20f12
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Register the routes
  exports: [RouterModule]                 // Export RouterModule for use in the AppModule
})
export class AppRoutingModule {}
 
 