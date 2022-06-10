import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCardComponent } from './login-card/login-card.component';
import { SignupCardComponent } from './signup-card/signup-card.component';


const routes: Routes = [
  { path: 'signup', component: SignupCardComponent },
  { path: 'login', component: LoginCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
