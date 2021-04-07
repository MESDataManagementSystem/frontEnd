import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  navRoute = [
    'Dashboard',
    'Students',
    'Teachers',
    'Classes',
    'Settings'
  ];
  navContent: any = [
    { name: 'Dashboard', icon: 'dashboard' },
    { name: 'Students', icon: 'people' },
    { name: 'Teachers', icon: 'people' },
    { name: 'Classes', icon: 'home' },
    { name: 'Settings', icon: 'settings' }
  ];
  showSideNav = true;
  lateActive = this.router.url.substring(5, 6).toUpperCase() + this.router.url.substring(6);
  oldBgColor = '#e3e6e8';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.navRoute.includes(this.lateActive)) {
      this.lateActive = 'Classes';
    }
  }

  childRoutes(content): void {
    this.lateActive = content;
    const routes = this.lateActive.toLowerCase();
    this.router.navigate([routes], { relativeTo: this.route });
    console.log();
  }

  logout() {
    window.localStorage.clear();
    this.router.navigate(['/login'])
  }

  // Confirmation Before LogOut
  warningAlert() {
    Swal.fire({
      icon: 'question',
      title: 'Are You Sure You Want To LogOut',
      showCancelButton: true,
      cancelButtonColor: '#FF0000',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout();
      }
    })
  }

}
