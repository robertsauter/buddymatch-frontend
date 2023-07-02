import { Component } from '@angular/core';
import { filterOptions } from '../../data/filter-options';

@Component({
  selector: 'app-filters-modal',
  templateUrl: './filters-modal.component.html',
  styleUrls: ['./filters-modal.component.css']
})
export class FiltersModalComponent {
  isStudyFieldsOpen = false;
  isStudyCoursesOpen = false;

  studyPrograms = filterOptions.studyPrograms;
  courses = filterOptions.courses;
  skills = filterOptions.skills;
}