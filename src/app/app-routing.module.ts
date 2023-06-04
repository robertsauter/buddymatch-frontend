import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { BuddyMatchComponent } from './buddy-match/buddy-match.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'buddy-match', component: BuddyMatchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
