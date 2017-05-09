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
           *ngFor="let employee of employees | filterEmployeesPipe: searchInput">
        <employee [employee]="employee"></employee>
      </div>
      <!--<div><p>data from Service HERE:</p><p style="color:red"> {{searchInput}}</p></div>-->
    </div>
  `
})
@Injectable()
export class HomeComponent{
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
<<<<<<< HEAD
=======

>>>>>>> parent of e6639ec... PB-0 tests for add-employee, edit-employee tests added
  enableEditing(employee){
    this.isEditing = true;
    this.employee = employee;
  }
<<<<<<< HEAD
=======
  gotoEmployeeProfile(employee){
    this.employee = employee;
  }

  cancelEditing() {
    this.isEditing = false;
    this.employee = {};
    // reload the cats to reset the editing
    this.getEmployees();
  }
>>>>>>> parent of e6639ec... PB-0 tests for add-employee, edit-employee tests added
  gotoAddEmployee(): void {
    let link = ['/add'];
    this.router.navigate(link);

  }

  toastCanceledEditing(){
    this.toast.setMessage('item editing canceled', 'warning');
  }
}
