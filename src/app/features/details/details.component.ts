import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { Book } from 'src/app/classes/book';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  epubFile: File;
  formData: FormData;

  constructor(private route: ActivatedRoute, private config: ConfigService, private http: HttpClient) { }

  ngOnInit() {
    console.log(this.route.snapshot.params.id);
    this.config.getBookDetail(this.route.snapshot.params.id)
    .subscribe(data => console.log(data)); 
  }

  myUploader(event) {
    this.epubFile = event.files[0];
    const formData: FormData = new FormData();
    var book: Book;      
    formData.append('epubFile', this.epubFile, this.epubFile.name);
    formData.append('title', 'Test');
    formData.append('authors', 'Test');
    formData.append('pageCount', 'Test');
    this.config.addBook1(formData)
    .subscribe(result => {
      console.log(result)
      
    });    
  }
}
