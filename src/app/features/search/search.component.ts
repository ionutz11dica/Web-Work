import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from 'src/app/classes/book';
import { ConfigService } from '../services/config.service';

import { Router, ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',     
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  constructor(private config : ConfigService, 
      private router : Router,
      private route: ActivatedRoute, 
      private store: Store<string>) { 
   
  }

  loading = true;
  bookAPI = [];
  books;
  sub;
  ngOnInit() {
    console.log(this.route.snapshot.params.query);
    this.sub = this.route.params.subscribe(params => {
       const term = params['query'];
       this.config.getSearch(term)
       .subscribe((result)=>{
         this.convertBook(result.items);
         this.books = this.bookAPI;
         this.loading = false;
   
       })
     });
  }

  convertBook(data) {
    this.bookAPI = [];
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

  ngOnDestroy(){
    if(!this.sub){
    }
  }

}
