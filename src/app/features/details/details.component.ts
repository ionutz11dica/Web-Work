import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { Book } from 'src/app/classes/book';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/state/search.state';
import { MatSnackBar } from '@angular/material';

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
  loginVisible: boolean = false;
  durationInSeconds = 5;
  snackBarRef;

  constructor(private route: ActivatedRoute, private config: ConfigService, private router:  Router,
              private fb: FormBuilder, private http: HttpClient, private store: Store<AppState>,
              private _snackBar: MatSnackBar) {    
    this.addBookForm = this.fb.group({
      title: ['', [<any>Validators.required]],
      authors: ['', [<any>Validators.required]],
      pageCount: ['', [<any>Validators.required]],
      imageLink: ['', [<any>Validators.required]],
      isbn: ['', [<any>Validators.required]],
      description: ['', [<any>Validators.required]],
      categories: ['', [<any>Validators.required]],
      publishedDate: ['', [<any>Validators.required]],
      publisher: ['', [<any>Validators.required]]
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
      if(this.bookData.volumeInfo.imageLinks.thumbnail){
        this.addBookForm.controls["imageLink"].setValue(this.bookData.volumeInfo.imageLinks.thumbnail);
      } else  if(this.bookData.volumeInfo.imageLinks.medium) {
        this.addBookForm.controls["imageLink"].setValue(this.bookData.volumeInfo.imageLinks.medium);
      }
      if(this.bookData.volumeInfo.industryIdentifiers == undefined){        
        this.addBookForm.controls["isbn"].setValue("other");
      } else {
        this.addBookForm.controls["description"].setValue(this.bookData.volumeInfo.industryIdentifiers[0]);
      }
      if(this.bookData.volumeInfo.description == undefined){        
        this.addBookForm.controls["description"].setValue("This book does not have description.");
      } else {
        this.addBookForm.controls["description"].setValue(this.bookData.volumeInfo.description);
      }

      if(this.bookData.volumeInfo.categories == undefined){
        this.addBookForm.controls["categories"].setValue("universal");
      } else {
        this.addBookForm.controls["categories"].setValue(this.bookData.volumeInfo.categories);
      }
      if(this.bookData.volumeInfo.publishedDate){
        this.addBookForm.controls["publishedDate"].setValue(this.bookData.volumeInfo.publishedDate);
      } else {
        this.addBookForm.controls["publishedDate"].setValue("No published date");
      }
      if(this.bookData.volumeInfo.publisher){
        this.addBookForm.controls["publisher"].setValue(this.bookData.volumeInfo.publisher);
      } else {
        this.addBookForm.controls["publisher"].setValue("No publisher");
      }
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
    
    this.store.pipe(select('search'))
      .subscribe((search: any) => {
        if(search) {
          if(search.userLogged){
            this.loginVisible = true;
          }
          if(search.searched){
            this.router.navigate(['/'])
          }
        }
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
    formData.append('imageLink', payload.imageLink);
    formData.append('isbn', payload.isbn);
    formData.append('description', payload.description);
    formData.append('categories', payload.categories);
    formData.append('publishedDate', payload.publishedDate);
    formData.append('publisher', payload.publisher);
    this.config.addBook1(formData)
    .subscribe(result => {
      console.log(result);
      if(result){        
        this.openSnackBar(result.message, 'Dismiss');
      }
    },
    error => {      
      this.openSnackBar(error.error.message, 'Dismiss');
    });
  }

  openSnackBar(message,action) {
    this.snackBarRef = this._snackBar.open(message, action, {duration: 10000, });
  }
}
