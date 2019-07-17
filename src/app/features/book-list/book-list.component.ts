import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { MatSnackBar, MatPaginator, MatTableDataSource } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books;
  snackBarRef;
  itemCreated;
  paginatorLen;
  page = 1;
  pageSize = 10;
  previousPage;

  constructor(private config: ConfigService, private _snackBar: MatSnackBar, private modalService: NgbModal) { }

  ngOnInit() {
    this.displayBooks();
  }

  delete(id, title){
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.bookDeleted.subscribe((result)=>{
      if(result){
        this.displayBooks();
      }
    })
  }

  displayBooks(){    
    this.config.getBooksFromDb()
    .subscribe(result => {
      this.books = result;
      this.paginatorLen = this.books.length;
    });
  }

  openSnackBar(message,action) {
    this.snackBarRef = this._snackBar.open(message, action, {duration: 10000});
  }
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
    }
  }
}
