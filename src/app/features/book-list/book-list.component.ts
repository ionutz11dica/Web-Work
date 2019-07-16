import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { MatSnackBar } from '@angular/material';
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
  

  constructor(private config: ConfigService, private _snackBar: MatSnackBar, private modalService: NgbModal) { }

  ngOnInit() {
    this.config.getBooksFromDb()
    .subscribe(result => this.books = result);
  }

  delete(id, title){
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.id = id;
  }

  openSnackBar(message,action) {
    this.snackBarRef = this._snackBar.open(message, action, {duration: 10000});
  }
}
