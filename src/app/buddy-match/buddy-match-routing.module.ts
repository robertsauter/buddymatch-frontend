import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuddyMatchComponent } from './buddy-match.component';
import { LoginComponent } from './pages/login/login.component';
import { DetailComponent } from './pages/detail/detail.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { ChatComponent } from './pages/chat/chat.component';
import { RegisterComponent } from './pages/register/register.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  { path: '', component: BuddyMatchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'chat/:userid', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuddyMatchRoutingModule { }
