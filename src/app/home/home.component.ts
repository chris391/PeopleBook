/**
 * Created by Cristian on 06/04/2017.
 */
import {Component} from "@angular/core";
import {DataService} from '../services/data.service';
import {Input} from "@angular/core/src/metadata/directives";


@Component({
  selector: 'home',
  styleUrls: ['home.component.css'],
  template:` 
  <!--<person ngFor*="let person of persons">HEI</person>-->
  <div class="row">
  <div class="col">col</div>
  <div class="col" style="background-color: #37ad79">col</div>
  <div class="col">col</div>
  <div class="col">col</div>
  <div class="col">col</div>
  <div class="col">col</div>
  <div class="col">col</div>

</div>
<div *ngIf="isEditing">
  <edit-employee [editEmployeeTarget]="employee"></edit-employee>
</div>
  
  <div class="row" >
    <div class="col-sm-3" *ngFor="let employee of employees">
      <employee [employeeTarget]="employee"></employee> 
    </div>  
  
  <!--<edit-employee [employeeTarget]="employee"></edit-employee>-->
  </div>
 `
})
export class HomeComponent{

  employees = [];
  employee = {};
  isLoading = true;
  isEditing = false;

  constructor(private dateService: DataService){}

  ngOnInit(){
    this.getEmployees();
  }

  getEmployees(){
    this.dateService.getEmployees().subscribe(
      data => this.employees = data,
      error => console.log(error),
      () => this.isLoading=false
    );
  }

  enableEditing(employee){
    this.isEditing = true;
    this.employee = employee;

  }

  cancelEditing() {
    this.isEditing = false;
    this.employee = {};
    // reload the cats to reset the editing
    this.getEmployees();
  }
}
