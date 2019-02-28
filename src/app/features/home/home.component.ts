import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { Book } from 'src/app/classes/book';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // template:`<app-search [books]="booksData"></app-search>`,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string = "Hello World";
  booksQuery: string = "Harry Potter"
  books: Array<Book>=[];

  constructor(private config: ConfigService) { }
 

  ngOnInit() {
    console.log(this.title);
   
    this.config.getBooks()
        .subscribe((data)=> {
          console.log(data.items.length)
          console.log(data.items)
          let srcImage;
          for(let i = 0; i < data.items.length; i++) {
            if(data.items[i].volumeInfo.imageLinks){
              if(data.items[i].volumeInfo.imageLinks.thumbnail && data.items[i].volumeInfo.imageLinks.thumbnail.includes("zoom=1")) {
                srcImage = data.items[i].volumeInfo.imageLinks.thumbnail.replace("zoom=1", "zoom=0");
                console.log(data.items[i].volumeInfo.imageLinks.thumbnail);
              }
            } else {
                srcImage = "https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg";
              }
            this.books.push({
              _id: data.items[i].id,
              _titleBook: data.items[i].volumeInfo.title,
              _authors: data.items[i].volumeInfo.authors,
              _description: data.items[i].volumeInfo.description,
              _pageCount: data.items[i].volumeInfo.pageCount,
              _publisher: data.items[i].volumeInfo.publisher,
              _publishedDate: data.items[i].volumeInfo.publishedDate,
              _imageLink: srcImage,
              _isEbook: data.items[i].saleInfo.isEbook,
              _publicDomain: true
            })
            console.log(this.books[i])
          }
          console.log(data.items[0].id)
        });
    
    // this.config.getSearch(this.booksQuery)
    // .subscribe((data) => {
    //   this.book=Book.parse(JSON.stringify(data))
    //   console.log(this.book.isEbook+ " merge??")
  }

}
