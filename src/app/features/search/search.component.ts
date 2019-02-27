import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Book } from 'src/app/classes/book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 // dataset:Array<string>=[];
  dataset = ["adev"];
  booksQuery: string = "Harry Potter";
  book:Book;
  Books:object[];
  //this.http.get("https://www.googleapis.com/books/v1/volumes?q=" + this.booksQuery + ":keyes&key=" + this.apiKey);
  constructor(private config:ConfigService) { 
   
  }

  ngOnInit() {
    // this.config.getBooks().subscribe(data=>{
    //   var test = data[0]
    //    this.dataset.push(JSON.stringify(data))
    //    console.log(test)
    //    this.book._authors= test['authors']
    //    console.log(this.book._authors)
    // })
  }

}
