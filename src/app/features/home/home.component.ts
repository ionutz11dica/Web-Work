import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { Book } from 'src/app/classes/book';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string = "Hello World";
  booksQuery: string = "Harry Potter"
  public books: Book[]=[];

  constructor(private config: ConfigService) { }
 

  ngOnInit() {
    console.log(this.title);
   
    this.config.getBooks()
        .subscribe(data=> {
          console.log(data['items'].length)
          let body = JSON.stringify(data)
          for(let i = 0; i < data['items'].length; i++){
            // this.books[i]._id = data['items'][i]['id'];
            this.books.push({
              _id: data['items'][i]['id'],
              _titleBook: 'Harry Potter',
              _authors: ['J.K Rowling'],
              _pageCount: 431,
              _publisher: 'Cucurigu',
              _publishedDate: new Date(),
              // _imageLink:ImageBitmap,
              _isEbook: true,
              _publicDomain: true
          })
            
          }

          
          
            console.log(data['items'][0]['id'])
        });
    
    // this.config.getSearch(this.booksQuery)
    // .subscribe((data) => {
    //   this.book=Book.parse(JSON.stringify(data))
    //   console.log(this.book.isEbook+ " merge??")
  }

}
