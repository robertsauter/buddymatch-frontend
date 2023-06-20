import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuddyMatchComponent } from './buddy-match.component';
import { LoginComponent } from './login/login.component';
import { DetailComponent } from './detail/detail.component';
import { MatchesComponent } from './matches/matches.component';
import { ChatComponent } from './chat/chat.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';

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
