import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string = "Hello World";
  booksQuery: string = "Harry Potter"

  constructor(private config: ConfigService) { }
 

  ngOnInit() {
    console.log(this.title);
    this.title = "cucu";
    
    
    this.config.getSearch(this.booksQuery)
    .subscribe((data) => {
      console.log(data)
    })
  }

}
