import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInCardComponent } from './signIn-card/signIn-card.component';

const routes: Routes = [
  { path: 'signin', component: SignInCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
