import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuddyMatchComponent } from './buddy-match.component';
import { LoginComponent } from './login/login.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', component: BuddyMatchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'detail', component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuddyMatchRoutingModule { }
