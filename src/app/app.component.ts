import {Component, OnInit, Injectable} from '@angular/core';
import {NodeService} from "./shared/service/subject-service";
import {Subject} from "rxjs";

@Component({
  providers: [NodeService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // @Injectable()
  search: any;
  ngOnInit() {
  }
  updateData() {
    this.nodeService.updateData(this.search);
  }
  constructor(private nodeService: NodeService) {}


}
