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
  addBookForm: FormGroup;

  constructor(private route: ActivatedRoute, private config: ConfigService,
              private fb: FormBuilder, private http: HttpClient) {    
    this.addBookForm = this.fb.group({
      title: ['', [<any>Validators.required]],
      authors: ['', [<any>Validators.required]],
      pageCount: ['', [<any>Validators.required]],
      imageLink: ['', [<any>Validators.required]]
    });
   }

  ngOnInit() {
    console.log(this.route.snapshot.params.id);
    this.config.getBookDetail(this.route.snapshot.params.id)
    .subscribe(data => console.log(data)); 
  }

  myUploader(event) {
    const payload = this.addBookForm.getRawValue();
    this.epubFile = event.files[0];
    const formData: FormData = new FormData();
    var book: Book;      
    formData.append('epubFile', this.epubFile, this.epubFile.name);
    formData.append('title', payload.title);
    formData.append('authors', payload.authors);
    formData.append('pageCount', payload.pageCount);
    this.config.addBook1(formData)
    .subscribe(result => {
      console.log(result)      
    });    
  }
}
