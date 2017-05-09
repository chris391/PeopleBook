import {Component, OnInit} from '@angular/core';
import {SharedService} from "./shared/service/shared-service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit{
  search: any;
  ngOnInit() {
  }
  updateData() {
    this.nodeService.updateSearchData(this.search);
  }
  constructor(private nodeService: SharedService) {}


}
