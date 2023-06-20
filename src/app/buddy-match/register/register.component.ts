import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isStudyFieldsOpen = false;
  isStudyCoursesOpen = false;

  filterOptions = {
    studyFields: [
      {
        name: 'komedia',
        displayName: 'Komedia',
      },
      {
        name: 'info',
        displayName: 'Informatik',
      }
    ]
  };
}
