import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Book } from 'src/app/classes/book';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiKey = environment.apiKey;
  private maxResults = "&maxResults=40&startIndex=0"
  // public books: Array<Book>=[];
  constructor(private http: HttpClient) { }

  getSearch (searchQuery: string) : Observable<any> {
    return this.http.get("https://www.googleapis.com/books/v1/volumes?q=" + searchQuery + "&key=" + this.apiKey);
  }

  getBooks() : Observable<any> {
    return this.http.get("https://www.googleapis.com/books/v1/volumes?q=Romeo&filter=free-ebooks&orderBy=relevance" + ""+this.maxResults+"&key=" + this.apiKey);
  }

   httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  addBook(book:Book): Observable<Book>{
      return this.http.post<Book>("http://localhost:4000/books/add",book,this.httpOptions);
  }
  getBookDetail(id) : Observable<any> {
    return this.http.get("https://www.googleapis.com/books/v1/volumes/" + id + "?key=" + this.apiKey);
  }
  
}

// export function getInitialState(): Book {
//   return {
//     _id: '1',
//     _titleBook: 'Cucurigu',
//     _authors: ['Cucurigu1'],
//     _description: 'aaasa asa asaa asa',
//     _pageCount: 34,
//     _publisher:  'aaa',
//     _publishedDate: '12.20.2018',
//     _isEbook: false,
//     _publicDomain: true
//   }
// }