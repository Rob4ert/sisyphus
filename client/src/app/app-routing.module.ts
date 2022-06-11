import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CreateRoutineComponent } from './create-routine/create-routine.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginCardComponent } from './login-card/login-card.component';
import { SignupCardComponent } from './signup-card/signup-card.component';


const routes: Routes = [
  { path: 'signup', component: SignupCardComponent },
  { path: 'login', component: LoginCardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-rutine', component: CreateRoutineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) { }

  sendTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
