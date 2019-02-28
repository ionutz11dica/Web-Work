import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/classes/book';
import { ConfigService } from '../services/config.service';



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
  //this.http.get("https://www.googleapis.com/books/v1/volumes?q=" + this.booksQuery + ":keyes&key=" + this.apiKey);
  constructor(private config : ConfigService) { 
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
