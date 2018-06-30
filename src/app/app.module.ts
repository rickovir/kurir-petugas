import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PaketComponent } from './paket/paket.component';
import { AcaraComponent } from './acara/acara.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AcaraDetailComponent } from './acara-detail/acara-detail.component';
import { AddPaketComponent } from './add-paket/add-paket.component';
import { UpdatePaketComponent } from './update-paket/update-paket.component';

const adminRoute:Routes =[
 {
   path:'home',
   component:HomeComponent
 },
 {
   path:'paket',
   component:PaketComponent,
 },
 {
    path:"paket/add",
    component:AddPaketComponent
 },
 {
    path:"paket/update/:id",
    component:UpdatePaketComponent
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
    PaketComponent,
    FooterComponent,
    AcaraDetailComponent,
    AddPaketComponent,
    UpdatePaketComponent
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
