import { Component, EventEmitter, Output } from '@angular/core';
import { filterOptions } from '../../data/filter-options';

@Component({
  selector: 'app-filters-modal',
  templateUrl: './filters-modal.component.html',
  styleUrls: ['./filters-modal.component.css']
})
export class FiltersModalComponent {
  @Output() filtersSaved = new EventEmitter<{
    studyPrograms: string[],
    courses: string[],
    skills: string[]
  }>();

  isStudyFieldsOpen = false;
  isStudyCoursesOpen = false;
  isSkillsOpen = false;

  studyPrograms = filterOptions.studyPrograms;
  courses = filterOptions.courses;
  skills = filterOptions.skills;

  selectedPrograms: string[] = [];
  selectedCourses: string[] = [];
  selectedSkills: string[] = [];

  updateSelectedFilters(
    event: Event,
    filterType: 'programs' | 'courses' | 'skills'
  ) {
    const element = event.target as HTMLInputElement;
    const name = element.name;
    const isChecked = element.checked;

    if(filterType === 'programs') {
      this.selectedPrograms = isChecked
        ? [...this.selectedPrograms, name]
        : this.selectedPrograms.filter(program => program !== name);
    }

    if(filterType === 'courses') {
      this.selectedCourses = isChecked
        ? [...this.selectedCourses, name]
        : this.selectedCourses.filter(course => course !== name);
    }

    if(filterType === 'skills') {
      this.selectedSkills = isChecked
        ? [...this.selectedSkills, name]
        : this.selectedSkills.filter(skill => skill !== name);
    }

    this.emitFilters();
  }

  saveFilters() {
    this.emitFilters();
  }

  private emitFilters(){
    this.filtersSaved.emit({
      studyPrograms: this.selectedPrograms,
      courses: this.selectedCourses,
      skills: this.selectedSkills
    });
  }
}