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
  books: any;
  initialState: boolean = false;
  bookAPI: Book[] = [];
  searchText : Observable<string> ;
  loading: boolean = true;
  logged: boolean = false;

  constructor(private config: ConfigService,
              private store: Store<AppState>) {
  }

  getInitialState(): void {
    this.config.getBooks()
    .subscribe((data)=> {
      this.convertBook(data.items);
      this.books = this.bookAPI;
      this.loading = false;
      this.initialState = true;
      this.store.dispatch(new SearchActions.LoadBooksSearch());
    });
  }
  
  convertBook(data) {
    if(!this.initialState){
      this.loading = false;
      this.bookAPI = [];
    }
    let srcImage;
    for(let i = 0; i < data.length; i++) {
      if(data[i].volumeInfo) {
        if(data[i].volumeInfo.imageLinks){
          if(data[i].volumeInfo.imageLinks.thumbnail && data[i].volumeInfo.imageLinks.thumbnail.includes("zoom=1")) {
            srcImage = data[i].volumeInfo.imageLinks.thumbnail.replace("zoom=1", "zoom=0");
          }
        } else {
            srcImage = "https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg";
        }
        this.bookAPI.push({
          id: data[i].id,
          title: data[i].volumeInfo.title,
          authors: data[i].volumeInfo.authors,
          description: data[i].volumeInfo.description,
          pageCount: data[i].volumeInfo.pageCount,
          publisher: data[i].volumeInfo.publisher,
          publishedDate: data[i].volumeInfo.publishedDate,
          imageLink: srcImage,
          isEbook: data[i].saleInfo.isEbook,
          publicDomain: data[i].accessInfo.publicDomain,
          isAvailableEpub: data[i].accessInfo.epub.isAvailable,
          downloadLink:data[i].accessInfo.epub.downloadLink,
          categories: data[i].volumeInfo.categories,
          isbn: data[i].volumeInfo.industryIdentifiers ? data[i].volumeInfo.industryIdentifiers[0].identifier : ""
        });
      } else 
        break;
    }
  }

  saveBook(book): void {
    console.log(book)
    this.config.addBook(book,null).subscribe(result=>{
      console.log(JSON.stringify(result))
    });
  }

  ngOnInit() {
    this.getInitialState();
    
    this.store.pipe(select('search'))
      .subscribe((search: any) => {
        if(search && search.toString() !== "" && search.searched) {
          if(search.books){
            this.loading = true;
            this.initialState = false;
            this.convertBook(search.books);
            this.books = this.bookAPI;
          }
        }
        if(search && search.userLogged){
          this.logged = true;
        }
    });
  }
}
