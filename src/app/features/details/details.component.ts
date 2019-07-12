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
  bookData: any;
  donwloadUrl: any;
  bookTitle;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private config: ConfigService,
              private fb: FormBuilder, private http: HttpClient) {    
    this.addBookForm = this.fb.group({
      title: ['', [<any>Validators.required]],
      authors: ['', [<any>Validators.required]],
      pageCount: ['', [<any>Validators.required]],
      imageLink: ['', [<any>Validators.required]],
      isbn: ['', [<any>Validators.required]]
    });
   }

  ngOnInit() {
    console.log(this.route.snapshot.params.id);
    this.config.getBookDetail(this.route.snapshot.params.id)
    .subscribe(data => {
      this.bookData = data;
      this.addBookForm.controls["title"].setValue(this.bookData.volumeInfo.title);
      this.addBookForm.controls["authors"].setValue(this.bookData.volumeInfo.authors);
      this.addBookForm.controls["pageCount"].setValue(this.bookData.volumeInfo.pageCount);
      this.addBookForm.controls["imageLink"].setValue(this.bookData.volumeInfo.imageLinks.medium);
      this.addBookForm.controls["isbn"].setValue("");
      if(this.bookData.volumeInfo.industryIdentifiers){
        var isbns = this.bookData.volumeInfo.industryIdentifiers;
        for(var i=0;i<isbns.length;i++){
          if(isbns[i].type.toUpperCase() == "ISBN_13"){
            this.addBookForm.controls["isbn"].setValue(isbns[i].identifier);
          }
        }
      }
      this.donwloadUrl = this.bookData.accessInfo.epub.downloadLink;
      this.bookTitle = this.bookData.volumeInfo.title;
      this.loading = false;
      console.log(this.bookData)
    }); 
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
    formData.append('isbn', payload.isbn);
    this.config.addBook1(formData)
    .subscribe(result => {
      console.log(result)      
    });
  }
}
