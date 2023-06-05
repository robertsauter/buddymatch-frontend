import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-buddy-match',
  templateUrl: './buddy-match.component.html',
  styleUrls: ['./buddy-match.component.css']
})
export class BuddyMatchComponent {
  @ViewChild('filtersModal') filtersModal!: HTMLDialogElement;
}
