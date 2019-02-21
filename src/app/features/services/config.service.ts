import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  
  apiKey = environment.apiKey;
  constructor(private http: HttpClient) { }

  getSearch (searchQuery: string) {
    return this.http.get("https://www.googleapis.com/books/v1/volumes?q=" + searchQuery + ":keyes&key=" + this.apiKey);
  }

}
