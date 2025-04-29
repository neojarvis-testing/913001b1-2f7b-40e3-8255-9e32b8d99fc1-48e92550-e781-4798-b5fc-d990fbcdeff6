import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthguardComponent } from './components/authguard/authguard.component';
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
import { RegisterComponent } from './components/registration/register.component';
import { TransactionformComponent } from './components/transactionform/transactionform.component';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AuthguardComponent,
    CustomeraddaccountComponent,
    CustomeraddfeedbackComponent,
    CustomernavComponent,
    CustomermytransactionsComponent,
    CustomerviewaccountComponent,
    CustomerviewfeedbackComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    ManagernavComponent,
    ManagerviewallaccountsComponent,
    ManagerviewalltransactionsComponent,
    ManagerviewfeedbackComponent,
    NavbarComponent,
    RegisterComponent,
    TransactionformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
