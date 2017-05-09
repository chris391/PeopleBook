/**
 * Created by Cristian on 06/04/2017.
 */
import {Component, Injectable, Input} from "@angular/core";
import {DataService} from '../services/data.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ToastComponent} from "../shared/toast/toast.component";
import {SharedService} from "../shared/service/shared-service";


@Component({
  selector: 'home',
  styleUrls: ['home.component.css'],
  template:`
    <app-toast [message]="toast.message"></app-toast>

    <div id="btn-padding">
      <button id="btn-styling" class="btn btn-lg btn-primary" (click)="gotoAddEmployee()"><i class="fa fa-plus"></i>
      </button>
    </div>

    <div class="row">
      <div id="employeeThumbnail" class="col-xs-10 col-sm-6 col-md-4 col-lg-3"
           *ngFor="let employee of employees | filterEmployees: searchInput">
        <employee [employee]="employee"></employee>
      </div>
    </div>
    <div id="date"> {{currentDateMs | date}} </div>
  `
})
@Injectable()
export class HomeComponent{
  currentDateMs =  Date.now();
  searchInput: any;
  employees = [];
  employee = {};
  isLoading = true;
  isEditing = false;

  constructor(private dataService: DataService, private route: ActivatedRoute,private router: Router,
                private toast: ToastComponent, private nodeService: SharedService){}

  ngOnInit(){
    this.getEmployees();

    this.nodeService.getSearchData().subscribe(data => {
      this.searchInput = data;
    })
  }

  getEmployees(){
    this.dataService.getEmployees().subscribe(
      data => this.employees = data,
      error => console.log(error),
      () => this.isLoading=false
    );
  }

  enableEditing(employee){
    this.isEditing = true;
    this.employee = employee;
  }
  gotoEmployeeProfile(employee){
    this.employee = employee;
  }

  cancelEditing() {
    this.isEditing = false;
    this.employee = {};

    this.getEmployees();
  }
  gotoAddEmployee(): void {
    let link = ['/add'];
    this.router.navigate(link);
  }
}
