import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../services/config.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  @Input() title;
  @Input() id;
  @Output() bookDeleted = new EventEmitter<boolean>();
  snackBarRef

  constructor(public activeModal: NgbActiveModal, 
              private config: ConfigService, 
              private _snackBar: MatSnackBar,
              private router : Router
              ) { }

  ngOnInit() {
  }

  openSnackBar(message,action) {
    this.snackBarRef = this._snackBar.open(message, action, {duration: 10000, });
  }

  delete(id){
    this.config.deleteBook(id)
    .subscribe(
      (result) => {
        this.openSnackBar(result.message,'Dismiss');
        this.activeModal.close();
        this.bookDeleted.emit(true);
      }),
      error => this.openSnackBar(error.error.message,'Dismiss')
  }

}
