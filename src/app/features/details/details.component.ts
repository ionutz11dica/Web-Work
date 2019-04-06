import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private config: ConfigService) { }

  ngOnInit() {
    console.log(this.route.snapshot.params.id);
    this.config.getBookDetail(this.route.snapshot.params.id)
    .subscribe(data => console.log(data)); 
  }

}
