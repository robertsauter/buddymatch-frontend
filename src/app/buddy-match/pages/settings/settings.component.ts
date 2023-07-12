import { AfterViewInit, Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { filterOptions } from '../../data/filter-options';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements AfterViewInit {
  isStudyCoursesOpen = false;
  isSkillsOpen = false;
  successMessageShown = false;

  studyPrograms = filterOptions.studyPrograms;
  courses = filterOptions.courses;
  skills = filterOptions.skills;

  user: User = {
    email: '',
    password: '',
    detail: {
      first_name: '',
      second_name: '',
      desc_short: '',
      motivation: '',
      study_program: '',
      attended_courses: [],
      skills: []
    }
  };

  constructor(
    private accountService: AccountService,
    private router: Router,
    private userService: UserService
  ) {}

  ngAfterViewInit(): void {
    this.userService.getUserById(this.accountService.userId$.value).pipe(first()).subscribe(user => {
      this.user = user || this.user;
      this.setCheckboxes();
    });
  }

  // Send request to the backend to update the user
  updateUser() {
    this.userService.updateUser(this.accountService.userId$.value, this.user.detail).pipe(first()).subscribe((user) => {
      if(user) {
        this.showSuccessMessage();
      }
    });
  }

  showSuccessMessage() {
    this.successMessageShown = true;
    setTimeout(() => this.successMessageShown = false, 1500);
  }

  setCheckboxes() {
    //Check the checkboxes, for the courses, that the user already attends
    document.querySelectorAll('.bm-course').forEach((courseElement) => {
      const courseInput = courseElement as HTMLInputElement;
      const isAttended = this.user.detail.attended_courses.find((course) => course === courseInput.name);
      courseInput.checked = isAttended ? true : false;
    });

    //Check the checkboxes, for the skills, that the user already has
    document.querySelectorAll('.bm-skill').forEach((skillElement) => {
      const skillInput = skillElement as HTMLInputElement;
      const hasSkill = this.user.detail.skills.find((skill) => skill === skillInput.name);
      if(hasSkill) {
        skillInput.checked = true;
      }
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/buddy-match/login']);
  }

  updateCourses(event: Event) {
    const element = event.target as HTMLInputElement;
    const name = element.name;
    const isChecked = element.checked;
    if(isChecked) {
      this.user.detail.attended_courses = [...this.user.detail.attended_courses, name];
    }
    else {
      this.user.detail.attended_courses = this.user.detail.attended_courses.filter(course => course !== name);
    }
  }

  updateSkills(event: Event) {
    const element = event.target as HTMLInputElement;
    const name = element.name;
    const isChecked = element.checked;
    if(isChecked) {
      this.user.detail.skills = [...this.user.detail.skills, name];
    }
    else {
      this.user.detail.skills = this.user.detail.skills.filter(skill => skill !== name);
    }
  }
}
