import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthenticationService } from 'src/app/helpers';
import { Router } from '@angular/router';
import { ConfigService } from '../services/config.service';

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
  @Input() menuItems;

  constructor ( private router: Router, private config: ConfigService,
                private authenticationService: AuthenticationService
    ) {
      
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      if(this.currentUser){
        this.loginVisible = true;
      }
     }

  ngOnInit() {
    this.items = this.config.getMenuItems();
    // if(this.currentUser){
    //   this.items.push(
    //     {label: this.currentUser.username, icon: 'fa fa-user', style: "float: right;", disabled: true, visible: this.loginVisible}
    //   );
    // }
    this.activeItem = this.items[0];
  }

  activateMenu() {
    this.activeItem = this.menu['activeItem'];
  }

}
