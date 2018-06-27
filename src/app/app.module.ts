import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AcaraComponent } from './acara/acara.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AcaraDetailComponent } from './acara-detail/acara-detail.component';

const adminRoute:Routes =[
 {
   path:'home',
   component:HomeComponent
 },
 {
   path:'acara',
   component:AcaraComponent
 },
 {
   path:'acara/:id',
   component:AcaraDetailComponent
 }

];

const appRoute: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component:MainComponent,
    children:adminRoute
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AcaraComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    AcaraDetailComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoute,
      { enableTracing: true }
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
