import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
        {label: 'Home', icon: 'fa fa-fw fa-home', routerLink: '/'},
        {label: 'Statistics', icon: 'fa far fa-chart-bar'}
    ];
  }

}
