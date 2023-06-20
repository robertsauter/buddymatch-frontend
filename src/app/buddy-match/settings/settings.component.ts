import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
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
