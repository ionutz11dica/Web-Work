import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { DetailsComponent } from './features/details/details.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { BookListComponent } from './features/book-list/book-list.component';
import { StatisticsComponent } from './features/statistics/statistics.component';
import { SearchComponent } from './features/search/search.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'books', component: BookListComponent },
  { path: 'search/:query', component: SearchComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: "reload",
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
