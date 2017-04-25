import {Component, Input, OnInit} from "@angular/core";
import {HomeComponent} from "../home/home.component";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {ToastComponent} from "../shared/toast/toast.component";
import {isUndefined} from "util";
import {isNullOrUndefined} from "util";

@Component({
  selector: "add-employee",
  styleUrls: ["add-employee.component.css"],
  template:`

  <tbody>
  <div *ngIf="isLoading">Loading...</div>
  <div *ngIf="!isLoading">
  <app-toast [message]="toast.message"></app-toast>
        <tr>
          <td colspan="4">
          <!--#form="ngForm"-->
            <form   #form="ngForm" (ngSubmit)="addEmployee()">
              <div class="form-group">
                  <input class="form-control" type="text" name="name" [(ngModel)]="employee.name" placeholder="Name" required> 
              </div>
              <p *ngIf="form.controls.name?.errors && form.controls.name.touched">
            The name is required
        </p>
              <!--<div *ngIf="!form.controls['name'].valid && form.controls['name'].touched" class="alert alert-danger">You must insert a name that has min length of 2 ch and max length of 5 ch.</div>-->
     
              <div class="form-group">
                  <input class="form-control" type="text" name="position" [(ngModel)]="employee.position" placeholder="Position" required>
                  <!--<span *ngIf="!myForm.controls.position?.valid && myForm.controls['position'].touched">-->
        <!--The title is required!-->
    <!--</span>-->
              </div>
              <div class="form-group">
                  <input class="form-control" type="text" name="department" [(ngModel)]="employee.department" placeholder="Department" required>
              </div>
              <div class="form-group">
                  <input class="form-control" type="text" name="superior" [(ngModel)]="employee.superiorName" placeholder="Superior" required>
              </div>
              <div class="form-group">
                  <input class="form-control" type="text" name="subordinate" [(ngModel)]="employee.subordinateName" placeholder="Subordinate" required>
              </div>
              <div class="form-group">
                  <input class="form-control" type="text" name="url" [(ngModel)]="employee.urlImage" placeholder="Image" >
              </div>
              
              <button class="btn btn-sm btn-primary" type="submit" [disabled]="!form.valid"><i class="fa fa-floppy-o"></i> Save </button>
              <button class="btn btn-sm btn-warning" (click)="cancelEditing()"><i class="fa fa-times"></i> Cancel </button>
            </form>
            
             <!--<textarea [(ngModel)]="message" rows="10" cols="35" [disabled]="sending"></textarea>-->
             
          </td>
        </tr>
      </tbody>
      </div>
`
})
export class AddEmployeeComponent implements OnInit{
  // @Input() editEmployeeTarget: any;
  isLoading = true;
  // myForm: FormGroup;
  private employee = {
    name: '',
    position: '',
    department:'',
    superiorName:'',
    subordinateName:'',
    urlImage:''
  };
  private objectID: any;

  constructor(private homeComponent: HomeComponent,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private dataService: DataService,
              private router: Router,
              private toast: ToastComponent) {

  }
  ngOnInit() {

    // this.myForm = this.fb.group({
    //   name: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(8)])],
    //   position: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(8)])],
    //   department: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(8)])],
    //   superior: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(8)])],
    //   subordinate: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(8)])]
    // });

    //getting the id of the selected employee
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        this.objectID = id;


        // this.myForm.setValue({
        //   name: 'ssss',
        //   position: 'Alt-J',
        //   department: 'Todd Motto',
        //   superior: 'Tiny',
        //   subordinate: 'Tin'
        // });
      });

    //requesting employee object
    if (!(this.objectID===undefined)) {
      this.dataService.getEmployee(this.objectID).subscribe(
        data => {
          this.employee = data;

          // this.myForm.controls['name'].setValue(this.employee.name, { onlySelf: true });
          // this.myForm.controls['position'].setValue(this.employee.position, { onlySelf: true });
          // this.myForm.controls['department'].setValue(this.employee.department, { onlySelf: true });
          // this.myForm.controls['superior'].setValue(this.employee.superiorName, { onlySelf: true });
          // this.myForm.controls['subordinate'].setValue(this.employee.subordinateName, { onlySelf: true });

          // this.myForm.updateValueAndValidity();
        },

        error => console.log(error),

        () => {
          this.isLoading = false;
        }
      );
    }
  else if(this.objectID===undefined){
      this.isLoading = false;
    }

  }



  cancelEditing(){

    // this.homeComponent.getEmployees();
    this.homeComponent.toastCanceledEditing();
    this.router.navigateByUrl('home');
    // console.log(this.myForm.value);
    // console.log(this.myForm.valid.valueOf());
    // this.homeComponent.cancelEditing();
  }


  addEmployee(){
    console.log(this.employee);
    this.dataService.addEmployee(this.employee).subscribe(
      res => {
        const newEmployee = res.json();
        this.toast.setMessage('item added successfully', 'success');
      },
      error => console.log(error),
      () => {
        this.router.navigateByUrl('home');
      }
    )
  }


}
