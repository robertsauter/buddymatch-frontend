import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuddyMatchComponent } from './buddy-match.component';
import { LoginComponent } from './login/login.component';
import { DetailComponent } from './detail/detail.component';
import { MatchesComponent } from './matches/matches.component';

const routes: Routes = [
  { path: '', component: BuddyMatchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'matches', component: MatchesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuddyMatchRoutingModule { }
