import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuddyMatchComponent } from './buddy-match.component';
import { LoginComponent } from './pages/login/login.component';
import { BuddyMatchRoutingModule } from './buddy-match-routing.module';
import { DetailComponent } from './pages/detail/detail.component';
import { FiltersModalComponent } from './pages/filters-modal/filters-modal.component';
import { FormsModule } from '@angular/forms';
import { MatchesComponent } from './pages/matches/matches.component';
import { ChatComponent } from './pages/chat/chat.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RegisterComponent } from './pages/register/register.component';
import { FirstLetterPipe } from './pipes/first-letter.pipe';

@NgModule({
  declarations: [
    BuddyMatchComponent,
    LoginComponent,
    DetailComponent,
    FiltersModalComponent,
    MatchesComponent,
    ChatComponent,
    SettingsComponent,
    RegisterComponent,
    FirstLetterPipe
  ],
  imports: [
    CommonModule,
    BuddyMatchRoutingModule,
    FormsModule
  ]
})
export class BuddyMatchModule { }
