import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { Book } from 'src/app/classes/book';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  epubFile: File;

  constructor(private route: ActivatedRoute, private config: ConfigService, private http: HttpClient) { }

  ngOnInit() {
    console.log(this.route.snapshot.params.id);
    this.config.getBookDetail(this.route.snapshot.params.id)
    .subscribe(data => console.log(data)); 
  }

  // myUploader(event) {

  //   this.epubFile = event.files[0];
  //   const formData: FormData = new FormData();
  //   formData.append('file', this.epubFile, this.epubFile.name );
  //   var book: Book;
  //   this.config.uploadFile(this.epubFile)
  //   .subscribe(result => {
  //     console.log(result)
  //     if(result) {
  //       book = {
  //         id: result.file.id,
  //         title: event.files[0].name, 
  //         authors: null,
  //         pageCount:null,
  //         description:null,
  //         publisher:null,
  //         publishedDate:null,
  //         imageLink:null,
  //         isEbook:null,
  //         publicDomain: null,
  //         isAvailableEpub: null,
  //         downloadLink: null,
  //         categories: null    
  //       }
        
  //     }
  //   });
    
  // }

  beforeUpload(event){
    var book: Book;
    book = {
      id: event.file.id,
      title: event.files[0].name, 
      authors: null,
      pageCount:null,
      description:null,
      publisher:null,
      publishedDate:null,
      imageLink:null,
      isEbook:null,
      publicDomain: null,
      isAvailableEpub: null,
      downloadLink: null,
      categories: null    
    }
    this.config.addBook(book, event.file.originalName)
  }
  uploadFile(form){
    console.log(form);
  }

}
