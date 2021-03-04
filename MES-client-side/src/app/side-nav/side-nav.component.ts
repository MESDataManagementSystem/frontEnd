import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  navContent: any = [{name: 'Dashboard', icon: 'dashboard' }, {name: 'Students', icon: 'people'}, {name: 'Teachers', icon: 'people'}, {name: 'Classes', icon: 'home'}, {name: 'Setting', icon: 'settings'}];
  showSideNav = true;
  lateActive = this.router.url.substring(5, 6).toUpperCase() +  this.router.url.substring(6);
  oldBgColor = '#e3e6e8';

  constructor( private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  childRoutes(content): void{
    const routes = content.toLowerCase();
    this.router.navigate([routes], {relativeTo: this.route});
    this.lateActive = content;
    console.log();
  }
}
