import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from '../services/config.service'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Book } from 'src/app/classes/book';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  // template: `Message:{{ceva}}`,
     
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 // dataset:Array<string>=[];
  dataset = ["adev"];
  booksQuery: string = "Harry Potter";
  booksData:Array<Book>=[];
  @Input()  books : Array<Book>
  //this.http.get("https://www.googleapis.com/books/v1/volumes?q=" + this.booksQuery + ":keyes&key=" + this.apiKey);
  constructor() { 
    
    
    //this.booksData= home.books
    
  }

  ngOnInit() {
    console.log("ceva mare")
    console.log(this.books)
    // this.config.getBooks().subscribe(data=>{
    //   var test = data[0]
    //    this.dataset.push(JSON.stringify(data))
    //    console.log(test)
    //    this.book._authors= test['authors']
    //    console.log(this.book._authors)
    // })
  }

}
