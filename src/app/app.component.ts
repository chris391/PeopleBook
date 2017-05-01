import {Component, OnInit} from '@angular/core';
import {NodeService} from "./shared/service/node-service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  search: any;
  ngOnInit() {
  }
  updateData() {
    this.nodeService.updateData(this.search);
  }
  constructor(private nodeService: NodeService) {}


}
