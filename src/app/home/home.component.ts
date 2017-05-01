/**
 * Created by Cristian on 06/04/2017.
 */
import {Component, Injectable} from "@angular/core";
import {DataService} from '../services/data.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ToastComponent} from "../shared/toast/toast.component";


@Component({
  selector: 'home',
  styleUrls: ['home.component.css'],
  template:` 
  <app-toast [message]="toast.message"></app-toast>  
  <!--<person ngFor*="let person of persons">HEI</person>-->
  
<div *ngIf="isEditing">
<!--                  binding target - binding source-->
<!--[editEmployeeTarget]="employee"-->
  <edit-employee></edit-employee> 
</div>
  
  <div id="btn-padding">
    <button id="btn-styling" class="btn btn-lg btn-primary" (click)="gotoAddEmployee()"><i class="fa fa-plus"></i>  </button>
  </div>
  
  <div class="row" >
    <div class="col-xs-10 col-sm-6 col-md-4 col-lg-3" *ngFor="let employee of employees">
      <employee [employeeTarget]="employee"></employee> 
    </div>  
  
  </div>
 `
})
//TODO
//TODO
//TODO
//TODO submit on edit form and then redirect to home component and reload items
@Injectable()
export class HomeComponent{

  employees = [];
  employee = {};
  isLoading = true;
  isEditing = false;

  constructor(private dataService: DataService, private route: ActivatedRoute,private router: Router,
                private toast: ToastComponent){}

  ngOnInit(){
    this.getEmployees();

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
    // reload the cats to reset the editing
    this.getEmployees();
  }
  gotoAddEmployee(): void {
    let link = ['/add'];
    this.router.navigate(link);

  }
  toastCanceledEditing(){
    this.toast.setMessage('item editing canceled', 'warning');
  }
}
