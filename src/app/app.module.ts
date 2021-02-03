import { RegisterService } from './service/register.service';
import { UtilisateurService } from './service/utilsateur.service';
import { EncdDecrService } from './service/EncdDecr.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { LoginService } from './service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { MassageComponent } from './massage/massage.component';
import { ProduitComponent } from './produit/produit.component';

@NgModule({
  declarations: [		
    AppComponent,
      MenuComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent,
      FooterComponent,
      MassageComponent,
      ProduitComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    UtilisateurService,
    RegisterService,
    EncdDecrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
