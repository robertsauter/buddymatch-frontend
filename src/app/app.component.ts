import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouteConfigLoadStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  moduleLoading = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if(event instanceof RouteConfigLoadStart && event.route.path === 'buddy-match') {
        this.moduleLoading = true;
      }
      else if(event instanceof NavigationEnd) {
        this.moduleLoading = false;
      }
    });
  }
}
