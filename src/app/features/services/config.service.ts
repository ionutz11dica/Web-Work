import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Book } from '../../classes/book'


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
    return this.http.get("https://www.googleapis.com/books/v1/volumes?q=download=epub+filter=free-ebooks" + ":keyes"+this.maxResults+"&key=" + this.apiKey);
  }

  getCucu(): Observable<any> {
    return this.http.get("http://localhost:4000/cucurigu");
  }
}
