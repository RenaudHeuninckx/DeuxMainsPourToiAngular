import { MassageDetailComponent } from './massageDetail/massageDetail.component';
import { ProduitComponent } from './produit/produit.component';
import { MassageComponent } from './massage/massage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'massage', component: MassageComponent },
  { path: 'massagedetail/:id', component: MassageDetailComponent },
  { path: 'produit', component: ProduitComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
