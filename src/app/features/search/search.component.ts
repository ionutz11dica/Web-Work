import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/classes/book';
import { ConfigService } from '../services/config.service';

import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

import { Store } from '@ngrx/store';
import * as SearchActions from '../store/actions/search.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  // template: `Message:{{ceva}}`,
     
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  books:Array<Book>=[];
  //searchText:string;
  //this.http.get("https://www.googleapis.com/books/v1/volumes?q=" + this.booksQuery + ":keyes&key=" + this.apiKey);
  constructor(private config : ConfigService, 
      private router : Router, 
      private store: Store<string>) { 
   
  }

  searchToggle(obj, evt) :void {
    var container = obj.closest('.search-wrapper');
      if(!container.hasClass('active')){
          container.addClass('active');
          evt.preventDefault();
      }
      else if(container.hasClass('active') && obj.closest('.input-holder').length == 0){
          container.removeClass('active');
          // clear input
          container.find('.search-input').val('');
      }
  }

  keyUpEnter(event) {
  //  this.router.navigate(['/details','book'], {
  //    queryParams:{'searchTerm': event.target.value}
  //  });
   if(event.target.value) {
    console.log(event.target.value);
    this.store.dispatch(new SearchActions.KeyUpSearch(event.target.value));
     this.config.getSearch(event.target.value).subscribe((data) => {
       console.log(data.items[0]);
     })
   }else{
     console.warn("null event target value");
   }

  }

  ngOnInit() {
    console.log("ceva mare")
    // this.config.getBooks().subscribe(data=>{
    //   var test = data[0]
    //    this.dataset.push(JSON.stringify(data))
    //    console.log(test)
    //    this.book._authors= test['authors']
    //    console.log(this.book._authors)
    // })
  }


}
