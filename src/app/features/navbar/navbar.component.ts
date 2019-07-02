import { Component, OnInit, ViewChild } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthenticationService } from 'src/app/helpers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;
  @ViewChild('menuItems') menu: MenuItem[];
  currentUser: any;
  loginVisible: boolean = false;

  constructor ( private router: Router,
                private authenticationService: AuthenticationService
    ) {
      
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      if(this.currentUser){
        this.loginVisible = true;
      }
     }

  ngOnInit() {
    this.items = [
        {label: 'Home', icon: 'fa fa-fw fa-home', routerLink: ['/']},
        // {label: 'Statistics', icon: 'fa far fa-chart-bar'},
        {label: 'Login', icon: 'fa fa-sign-in', visible: this.loginVisible, routerLink: ['/login']},
        {label: 'Logout', icon: 'fa fa-sign-out', visible: !this.loginVisible, command: (event) => {
          this.authenticationService.logout();
          this.router.navigate(['/login']);
        }}
    ];
    this.activeItem = this.items[0];
  }

  activateMenu() {
    this.activeItem = this.menu['activeItem'];
  }

}
