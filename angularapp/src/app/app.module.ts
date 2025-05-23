import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { CustomeraddaccountComponent } from './components/customeraddaccount/customeraddaccount.component';
import { CustomeraddfeedbackComponent } from './components/customeraddfeedback/customeraddfeedback.component';
import { CustomernavComponent } from './components/customernav/customernav.component';
import { CustomermytransactionsComponent } from './components/customermytransactions/customermytransactions.component';
import { CustomerviewaccountComponent } from './components/customerviewaccount/customerviewaccount.component';
import { CustomerviewfeedbackComponent } from './components/customerviewfeedback/customerviewfeedback.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ManagernavComponent } from './components/managernav/managernav.component';
import { ManagerviewallaccountsComponent } from './components/managerviewallaccounts/managerviewallaccounts.component';
import { ManagerviewalltransactionsComponent } from './components/managerviewalltransactions/managerviewalltransactions.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TransactionformComponent } from './components/transactionform/transactionform.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomeraddaccountComponent,
    CustomeraddfeedbackComponent,
    CustomernavComponent,
    CustomermytransactionsComponent,
    CustomerviewaccountComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    ManagernavComponent,
    ManagerviewalltransactionsComponent,
    ManagerviewfeedbackComponent,
    CustomerviewfeedbackComponent,
    NavbarComponent,
    RegistrationComponent,
    TransactionformComponent,
    RegistrationComponent,
    ManagerviewallaccountsComponent,
    FooterComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,// Correctly imported routing module
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}