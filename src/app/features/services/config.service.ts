import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Book } from 'src/app/classes/book';
import { catchError } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import { FileUpload } from 'primeng/fileupload';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiKey = environment.apiKey;
  private maxResults = "&maxResults=40&startIndex=0"
  
//   httpOptions = {
//    headers: new HttpHeaders({'Content-Type': 'application/json'})
//  };
  // public books: Array<Book>=[];
  constructor(private http: HttpClient) { }

  getSearch (searchQuery: string) : Observable<any> {
    return this.http.get("https://www.googleapis.com/books/v1/volumes?q=" + searchQuery + "&key=" + this.apiKey);
  }
  getBooks() : Observable<any> {
    return this.http.get("https://www.googleapis.com/books/v1/volumes?q=Romeo&filter=free-ebooks&orderBy=relevance" + ""+this.maxResults+"&key=" + this.apiKey);
  }
  addBook(book:Book, name): Observable<Book>{
      return this.http.post<Book>("http://localhost:4000/books/addFile/" + name, book);
  }
  uploadFile(file:File): Observable<any>{
      return this.http.post("http://localhost:4000/uploadFile/", file);
  }
  getBookDetail(id) : Observable<any> {
    return this.http.get("https://www.googleapis.com/books/v1/volumes/" + id + "?key=" + this.apiKey);
  }
  
}