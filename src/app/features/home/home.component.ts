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
            id: data.items[i].id,
            title: data.items[i].volumeInfo.title,
            authors: data.items[i].volumeInfo.authors,
            description: data.items[i].volumeInfo.description,
            pageCount: data.items[i].volumeInfo.pageCount,
            publisher: data.items[i].volumeInfo.publisher,
            publishedDate: data.items[i].volumeInfo.publishedDate,
            imageLink: srcImage,
            isEbook: data.items[i].saleInfo.isEbook,
            publicDomain: data.items[i].accessInfo.publicDomain,
            isAvailableEpub: data.items[i].accessInfo.epub.isAvailable,
            downloadLink:data.items[i].accessInfo.epub.downloadLink,
            categories: data.items[i].volumeInfo.categories
           
          });
        }
      this.store.dispatch(new SearchActions.InitialStateSearch(this.bookAPI));
      this.books$ = this.store.select('search');
    });
  }

  saveBook(book): void {
    console.log(book)
    this.config.addBook(book).subscribe(result=>{
      console.log(JSON.stringify(result))
    });
  }
  ngOnInit() {
    this.getInitialState();

  }
}
