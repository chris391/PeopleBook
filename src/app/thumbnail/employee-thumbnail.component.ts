/**
 * Created by Cristian on 06/04/2017.
 */
import {Component} from "@angular/core";
import {HomeComponent} from "../home/home.component";
import {Input} from "@angular/core/src/metadata/directives";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {ToastComponent} from "../shared/toast/toast.component";
import {SharedService} from "../shared/service/shared-service";

@Component({
  selector: 'employee',
  styleUrls: ['employee-thumbnail.component.css'],
  template:`
    <h2 id="employeeName" (click)="gotoEmployeeProfile()">{{employee.name}} </h2>
    <!--<img class="img-fluid" src="http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Mammals/H-P/polar-bear-cub-on-mom.jpg" -->
    <img class="img-fluid" src={{employee.urlImage}}
    alt="Image">
    <div>Position: {{employee.position}}</div>
    <div>Department: {{employee.department}}</div>
    <div>E-mail: {{employee.email}}</div>
    <div class="tools">
      <svg class="favorite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"/>
      </svg>

      <!--<a  class="delete">remove</a> -->
      <!--<button id="button1" class="btn btn-sm btn-info" (click)="deleteEmployee(employeeTarget)"><i class="fa fa-user-circle"></i> </button>-->
      <button id="hand-hover" class="btn btn-sm btn-danger" (click)="deleteEmployee()"><i class="fa fa-pencil"></i>
        Delete
      </button>
      <button id="hand-hover" class="btn btn-sm btn-warning" (click)="gotoEmployeeEdit()"><i class="fa fa-pencil"></i>
        Edit
      </button>

      <!--<a  class="details">-->
      <!--details-->
      <!--</a>-->
      <!--<button class="btn btn-sm btn-warning" (click)="enableEditing(employeeTarget)"><i class="fa fa-pencil"></i> Edit</button>-->
    </div>`
})


export class EmployeeThumbnailComponent{
  @Input() employee;

  constructor(private homeComponent: HomeComponent, private router: Router, private dataService: DataService,
              private toast: ToastComponent, private sharedService: SharedService){
  }

  ngOnInit(){//fixme

    // this.employee = this.homeComponent.employee;
  }

  enableEditing(employee){
    this.homeComponent.enableEditing(employee);
  }
  deleteEmployee() {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.deleteEmployee(this.employee).subscribe(
        res => {
        },
        error => console.log(error),
        () => {
          this.toast.setMessage('item deleted successfully.', 'success');
          let index = this.homeComponent.employees.indexOf(this.employee);
          this.homeComponent.employees.splice(index, 1);

        }
      );
    }

  }
  gotoEmployeeEdit(): void {
    let link = ['/edit', this.employee.userID];
    this.router.navigate(link);

  }
  gotoEmployeeProfile() : void{
    // this.sharedService.updateEmployee(this.employee);
    // this.sharedService.getEmployee().subscribe(e=> console.log('s'));
    this.sharedService.updateEmployee(this.employee);
    let link = ['/profile', this.employee.userID ];
    this.router.navigate(link);
  }






}
