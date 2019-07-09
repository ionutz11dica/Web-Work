import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Book } from 'src/app/classes/book';
import { catchError } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import { FileUpload } from 'primeng/fileupload';
import { AuthenticationService } from 'src/app/helpers';
import { Router } from '@angular/router';
import { InternalFormsSharedModule } from '@angular/forms/src/directives';
import { MenuItem } from 'primeng/api';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiKey = environment.apiKey;
  private maxResults = "&maxResults=40&startIndex=0"
  currentUser;
  loginVisible: boolean = false;
  
  httpOptions = {
   headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})
 };
  // public books: Array<Book>=[];
  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService, private router: Router) {
      
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      if(this.currentUser){
        this.loginVisible = true;
      }
    }

  getSearch (searchQuery: string) : Observable<any> {
    // return this.http.get("https://www.googleapis.com/books/v1/volumes?q=" + searchQuery + "&download=epub&filter=free-ebooks&orderBy=relevance" + this.maxResults + "&key=" + this.apiKey);
    return this.http.get("https://www.googleapis.com/books/v1/volumes?q=" + searchQuery + "&download=epub&orderBy=relevance" + this.maxResults + "&key=" + this.apiKey);
  }
  getBooks() : Observable<any> {
    return this.http.get("https://www.googleapis.com/books/v1/volumes?q=a&download=epub&filter=free-ebooks&orderBy=relevance" + this.maxResults + "&key=" + this.apiKey);
  }
  addBook(book:Book, name): Observable<Book>{
      return this.http.post<Book>("http://localhost:4000/books/addFile/" + name, book);
  }
  addBook1(formData): Observable<any>{
      return this.http.post<Book>("http://localhost:4000/books/addFile/", formData);
  }
  uploadFile(formData: FormData): Observable<any>{
      return this.http.post("http://localhost:4000/books/uploadFile", formData);
  }
  getBookDetail(id) : Observable<any> {
    return this.http.get("https://www.googleapis.com/books/v1/volumes/" + id + "?key=" + this.apiKey);
  }
  // getMenuItems(): MenuItem[] {
  //   var items: MenuItem[];
  //   items = [
  //     {label: 'Home', icon: 'fa fa-fw fa-home', routerLink: ['/']},
  //     // {label: 'Statistics', icon: 'fa far fa-chart-bar'},
  //     {label: 'Login', icon: 'fa fa-sign-in', visible: !this.loginVisible, routerLink: ['/login']},
  //     {label: 'Logout', icon: 'fa fa-sign-out', visible: this.loginVisible, command: (event) => {
  //       this.authenticationService.logout();
  //       this.router.navigateByUrl('/navbar', {skipLocationChange: true}).then(()=>
  //         this.router.navigate(["/login"])
  //       );
  //     }},
  //   ];
  //   if(this.currentUser) {
  //     items.push(
  //       {label: this.currentUser.username, icon: 'fa fa-user', disabled: true, visible: this.loginVisible}
  //     );
  //   }
  //   return items;
  // }
  
}