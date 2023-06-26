import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { AccountService } from '../../services/account.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  error: boolean = false;

  isStudyProgramsOpen = false;
  isStudyCoursesOpen = false;
  isSkillsOpen = false;

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

  studyPrograms = [
    {
      name: 'komedia',
      displayName: 'Komedia',
    },
    {
      name: 'info',
      displayName: 'Computer science',
    }
  ];

  courses = [
    {
      name: 'awt',
      displayName: 'Advanced web technologies',
    },
    {
      name: 'ile',
      displayName: 'Intelligent learning environments',
    }
  ];

  skills = [
    {
      name: 'js',
      displayName: 'JavaScript'
    },
    {
      name: 'python',
      displayName: 'Python'
    }
  ];

  constructor(private accountService: AccountService, private router: Router) {}

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

  tryRegister() {
    this.accountService.register(this.user)
      .pipe(first())
      .subscribe({
          next: () => this.router.navigate(['/buddy-match/login']),
          error: () => this.error = true
      });
  }
}
