import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from "../shared/service/shared-service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {ToastComponent} from "../shared/toast/toast.component";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  //@Input() ;
  employee : any;
  objectID : any;
  isLoading = true;
  superiors=[];
  subordinates=[];


  constructor(private sharedService : SharedService, private route : ActivatedRoute, private dataService: DataService, private router: Router,
    private toast: ToastComponent, private homeComponent : HomeComponent) {

  }


  ngOnInit() {

    this.route.params.subscribe(param=>{
      let id = param['id'];
      this.objectID = id;
    })

    this.dataService.getEmployee(this.objectID).subscribe(employee=>{
      this.employee = employee;
      this.superiors = employee.superiorsUserID;
      this.subordinates = employee.subordinatesUserID;

    },
      error=> console.log(error),
      ()=> {
        this.isLoading = false;
      }
    )


  }
  gotoEdit(){
    let link = ['/edit', this.objectID];
    this.router.navigate(link);

  }
  deleteEmployee(){
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.deleteEmployee(this.employee).subscribe(
        res => {
        },
        error => console.log(error),
        () => {
          this.toast.setMessage('item deleted successfully.', 'success');
          let index = this.homeComponent.employees.indexOf(this.employee);
          this.homeComponent.employees.splice(index, 1);
          this.router.navigateByUrl('/home');

        }
      );
    }
  }

}







