import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuddyMatchComponent } from './buddy-match.component';
import { LoginComponent } from './login/login.component';
import { BuddyMatchRoutingModule } from './buddy-match-routing.module';
import { DetailComponent } from './detail/detail.component';
import { FiltersModalComponent } from './filters-modal/filters-modal.component';
import { FormsModule } from '@angular/forms';
import { MatchesComponent } from './matches/matches.component';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    BuddyMatchComponent,
    LoginComponent,
    DetailComponent,
    FiltersModalComponent,
    MatchesComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    BuddyMatchRoutingModule,
    FormsModule
  ]
})
export class BuddyMatchModule { }
