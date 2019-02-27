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

  constructor(private http: HttpClient) { }

  getSearch (searchQuery: string) {
    return this.http.get("https://www.googleapis.com/books/v1/volumes?q=" + searchQuery + ":keyes&key=" + this.apiKey);
  }

  getBooks(){
    return this.http.get("https://www.googleapis.com/books/v1/volumes?q=" + ":keyes&key=" + this.apiKey);
  }

}
