import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filters-modal',
  templateUrl: './filters-modal.component.html',
  styleUrls: ['./filters-modal.component.css']
})
export class FiltersModalComponent {
  isStudyFieldsOpen = false;
  isStudyCoursesOpen = false;
}
