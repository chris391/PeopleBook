/**
 * Created by Cristian on 06/04/2017.
 */
import {Component} from "@angular/core";
import {HomeComponent} from "../home/home.component";
import {Input} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'employee',
  styleUrls: ['employee.component.css'],
  template:` 
 <h2>Employee: {{employeeTarget.name}}</h2>
  <div>Position: {{employeeTarget.position}}</div>
  <div>Subordinate: {{employeeTarget.subordinateName}}</div>
  <div>2016</div>
  <div class="tools">
      <svg class="favorite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"/>
      </svg>
     
      <a class="delete">
          remove
      </a> 
      <a class="details">
          watch
      </a>
      <button class="btn btn-sm btn-warning" (click)="enableEditing(cat)"><i class="fa fa-pencil"></i> Edit</button>
 </div>`
})


export class EmployeeComponent{
  @Input() employeeTarget;
  //  employee={
  //   name: String,
  //   age: Number,
  //   weight: Number
  // };

//this is a new comment
  ngOnInit(){

  }



}
