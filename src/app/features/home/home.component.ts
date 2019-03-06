import { Component, OnInit, Input, Injectable, Output } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { Book } from 'src/app/classes/book';

import { Observable } from 'rxjs';
import { Store, select, State } from '@ngrx/store';
import * as SearchActions from '../store/actions/search.actions';
import { AppState } from '../store/state/search.state';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // template:`<app-search [books]="booksData"></app-search>`,
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  booksQuery: string = "Harry Potter";
  books$: Observable<Book[]>;
  // books: Book[];
  bookAPI: Book[] = [];
  searchText : Observable<string> ;

  constructor(private config: ConfigService,
              private store: Store<AppState>) {
  }

  getInitialState(): void {  
    this.config.getBooks()
    .subscribe((data)=> {
      console.log(data.items.length)
      console.log(data.items)
      let srcImage;
      for(let i = 0; i < data.items.length; i++) {
          if(data.items[i].volumeInfo.imageLinks){
            if(data.items[i].volumeInfo.imageLinks.thumbnail && data.items[i].volumeInfo.imageLinks.thumbnail.includes("zoom=1")) {
              srcImage = data.items[i].volumeInfo.imageLinks.thumbnail.replace("zoom=1", "zoom=0");
            }
          } else {
              srcImage = "https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg";
            }
          this.bookAPI.push({
            _id: data.items[i].id,
            _titleBook: data.items[i].volumeInfo.title,
            _authors: data.items[i].volumeInfo.authors,
            _description: data.items[i].volumeInfo.description,
            _pageCount: data.items[i].volumeInfo.pageCount,
            _publisher: data.items[i].volumeInfo.publisher,
            _publishedDate: data.items[i].volumeInfo.publishedDate,
            _imageLink: srcImage,
            _isEbook: data.items[i].saleInfo.isEbook,
            _publicDomain: data.items[i].accessInfo.publicDomain
          });
        }
      this.store.dispatch(new SearchActions.InitialStateSearch(this.bookAPI));
      this.books$ = this.store.select('search');
    });
  }
  ngOnInit() {
    this.getInitialState();

    this.config.getCucu()
    .subscribe((data) => {
    })
  }
}
