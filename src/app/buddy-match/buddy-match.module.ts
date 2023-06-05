import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuddyMatchComponent } from './buddy-match.component';
import { LoginComponent } from './login/login.component';
import { BuddyMatchRoutingModule } from './buddy-match-routing.module';
import { DetailComponent } from './detail/detail.component';



@NgModule({
  declarations: [BuddyMatchComponent, LoginComponent, DetailComponent],
  imports: [
    CommonModule,
    BuddyMatchRoutingModule
  ]
})
export class BuddyMatchModule { }
