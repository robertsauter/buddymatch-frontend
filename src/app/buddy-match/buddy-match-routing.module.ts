import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuddyMatchComponent } from './buddy-match.component';
import { LoginComponent } from './pages/login/login.component';
import { DetailComponent } from './pages/detail/detail.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { ChatComponent } from './pages/chat/chat.component';
import { RegisterComponent } from './pages/register/register.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { isLoggedInGuard, isNotLoggedInGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: BuddyMatchComponent, canActivate: [isLoggedInGuard] },
  { path: 'login', component: LoginComponent, canActivate: [isNotLoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [isNotLoggedInGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [isLoggedInGuard] },
  { path: 'detail/:userId', component: DetailComponent, canActivate: [isLoggedInGuard] },
  { path: 'matches', component: MatchesComponent, canActivate: [isLoggedInGuard] },
  { path: 'chat/:userid', component: ChatComponent, canActivate: [isLoggedInGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuddyMatchRoutingModule { }
