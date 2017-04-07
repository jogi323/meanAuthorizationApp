import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Typeahead } from 'ng2-typeahead';

import {AppService} from './app.service';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/home/login/login.component';
import { RegisterComponent } from './components/home/register/register.component';
import { HomeComponent } from './components/home/home/home.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import {DashboardComponent} from './components/dashboard/dashboard/dashboard.component';
import { ProfileService } from './components/dashboard/profile/profile.service';
import {AuthGuard} from './guards/auth.guard';
import {ValidateService} from './validate.service';
import {FlashMessagesModule } from 'angular2-flash-messages/module';

import { ContactComponent } from './components/dashboard/contact/contact.component';
import { AboutComponent } from './components/dashboard/about/about.component';
//import { DefaultComponent } from './components/dashboard/default/default.component';

import { SearchedUserComponent } from './components/dashboard/searched-user/searched-user.component';
import { HomepageComponent } from './components/dashboard/homepage/homepage.component';
import { UserDetailsComponent } from './components/dashboard//homepage/user-details/user-details.component';
import { DbComponent } from './components/dashboard/homepage/db/db.component';
import { ForgotpasswordComponent } from './components/home/forgotpassword/forgotpassword.component';
import { PasswordResetComponent } from './components/home/password-reset/password-reset.component';

const appRoutes: Routes = [
  {
    path: "", component: HomeComponent,
    children: [
      { path: "forgotpassword", component: ForgotpasswordComponent },
      { path: "register", component: RegisterComponent },
      { path: "", component: LoginComponent },
      { path: "resetpassword", component: PasswordResetComponent },
    ]
  }, {path: "dashboard", component: DashboardComponent,canActivate:[AuthGuard],
    children: [
      { path: "home", component: HomepageComponent,canActivate:[AuthGuard],
      children:[
        { path: "userdetails", component: UserDetailsComponent,canActivate:[AuthGuard] },
        { path: "usersdata", component: DbComponent,canActivate:[AuthGuard] },
      ]},
      { path: "contact", component: ContactComponent,canActivate:[AuthGuard] },
      { path: "about", component: AboutComponent,canActivate:[AuthGuard] },
      { path: "profile", component: ProfileComponent,canActivate:[AuthGuard] },
      
      { path: "searcheduser", component: SearchedUserComponent,canActivate:[AuthGuard] },
    ]
  }
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ContactComponent,
    AboutComponent,
    Typeahead, 
    SearchedUserComponent,
    HomepageComponent,  
    UserDetailsComponent, DbComponent, ForgotpasswordComponent, PasswordResetComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [AppService,ProfileService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
