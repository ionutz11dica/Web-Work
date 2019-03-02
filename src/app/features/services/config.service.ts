import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Book } from 'src/app/classes/book';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiKey = environment.apiKey;
  private maxResults = "&maxResults=40&startIndex=0"
  // public books: Array<Book>=[];
  constructor(private http: HttpClient) { }

  getSearch (searchQuery: string) : Observable<any> {
    return this.http.get("https://www.googleapis.com/books/v1/volumes?q=" + searchQuery + ":keyes&key=" + this.apiKey);
  }

  getBooks() : Observable<any> {
    return this.http.get("https://www.googleapis.com/books/v1/volumes?q=filter=free-ebooks" + ":keyes"+this.maxResults+"&key=" + this.apiKey);
  }

  getCucu(): Observable<any> {
    return this.http.get("http://localhost:4000/cucurigu");
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