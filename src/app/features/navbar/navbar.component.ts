import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from 'src/app/helpers';
import { Router, RouterStateSnapshot } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/state/search.state';
import * as SearchActions from '../store/actions/search.actions';
import { state } from '@angular/animations';

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
  userName: string;
  searchText: any;

  constructor ( private router: Router, private config: ConfigService,
                private authenticationService: AuthenticationService, private store: Store<AppState>
    ) {
      
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      if(this.currentUser){
        this.loginVisible = true;
      }
     }

  ngOnInit() {
    this.store.pipe(select('search'))
      .subscribe((search: any) => {
        if(search) {
          if(search.userLogged){
            this.loginVisible = true;
          } else {
            this.loginVisible = false;
          }
          if(search.userData){
            this.userName = search.userData;
          }
          if(search.searched){
            this.router.navigate(['/'])
          }
        }
      });
  }

  activateMenu() {
    this.activeItem = this.menu['activeItem'];
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(["/login"], {queryParams: {returnUrl: "#/login"}});
    this.router.navigateByUrl('/login');
  }

  
  keyUpEnter(event) {
    if(event.target.value) {
      this.store.dispatch(new SearchActions.KeyUpSearch(event.target.value));
    }else {
      this.store.dispatch(new SearchActions.LoadBooksSearch());
      console.warn("null event target value");
    }
  }

  search(query){
    if(query){
      this.store.dispatch(new SearchActions.KeyUpSearch(query));
    }else {
      this.store.dispatch(new SearchActions.LoadBooksSearch());
      console.warn("null event target value");
    }
  }

  textEmpty(){
    if(this.searchText == ""){
      this.store.dispatch(new SearchActions.LoadBooksSearch());
    }
  }

}
