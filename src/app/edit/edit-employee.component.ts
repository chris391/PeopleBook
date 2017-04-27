import {Component, Input, OnInit} from "@angular/core";
import {HomeComponent} from "../home/home.component";
import {FormBuilder, FormGroup, Validators, FormControl, FormArray} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {ToastComponent} from "../shared/toast/toast.component";
import {isUndefined} from "util";
import {isNullOrUndefined} from "util";

@Component({
  selector: "edit-employee",
  styleUrls: ["edit-employee.component.css"],
  template:`

  <tbody>
  <div *ngIf="isLoading">Loading...</div>
  <div *ngIf="!isLoading">
  <app-toast [message]="toast.message"></app-toast>
        <tr>
          <td colspan="4">
          <!--#myForm="ngForm"-->
            <form [formGroup]="myForm">
              <div class="form-group">
                  <input class="form-control" type="text" formControlName="name" placeholder="Name" required> 
              </div>
              <!--<div *ngIf="!myForm.controls['name'].valid && myForm.controls['name'].touched" class="alert alert-danger">You must insert a name that has min length of 2 ch and max length of 5 ch.</div>-->
     
              <div class="form-group">
                  <input class="form-control" type="text" formControlName="position" placeholder="Position" required>
                  <!--<span *ngIf="!myForm.controls.position?.valid && myForm.controls['position'].touched">-->
        <!--The title is required!-->
    <!--</span>-->
              </div>
              
              <button class="btn btn-sm btn-primary" type="submit" (click)="editEmployee(myForm.value)" [disabled]="!myForm.valid"><i class="fa fa-floppy-o"></i> Save </button>
              <button class="btn btn-sm btn-warning" (click)="cancelEditing()"><i class="fa fa-times"></i> Cancel </button>
              <button class="btn btn-sm btn-warning" (click)="getEmployee()">Print Employee </button>
              
              
              <div formArrayName="subordinatesUserID"> 
                <!--<button (click)="addLink()">Add address</button>-->
                <div *ngFor="let subordinate of myForm.controls.subordinatesUserID.controls; let i=index">
                  <!-- address header, show remove button when more than one address available -->
                  <div>
                    <span>Subordinate {{i + 1}}</span>
                    <span *ngIf="myForm.controls.subordinatesUserID.controls.length > 0" (click)="removeSubordinate(i)">
                      Remove
                    </span>
                  </div>
  
                <!-- Angular assigns array index as group name by default 0, 1, 2, ... -->
                <div [formGroupName]="i">
                  <div>
                      <label>Subordinate</label>
                      <input class="form-control" type="text" formControlName="subordinateID">
                  </div>
                </div>
              </div>
              </div>
              
              <div class="margin-20">
                <a style="cursor: pointer; color: #07C" (click)="addSubordinate()">Add another subordinate +</a>
              </div>
              
            </form>
            
             <!--<textarea [(ngModel)]="message" rows="10" cols="35" [disabled]="sending"></textarea>-->
             
          </td>
        </tr>
      </tbody>
      </div>
`
})
export class EditEmployeeComponent {
  isLoading = true;
  public myForm: FormGroup;
  form: FormGroup;
  private objectID: any;

  constructor(private homeComponent: HomeComponent, private fb: FormBuilder, private route: ActivatedRoute, private dataService: DataService, private router: Router, private toast: ToastComponent) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      name: [''],
      position: new FormControl(''),
      subordinatesUserID: this.fb.array([])
    });

    //getting the id of the selected employee
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        this.objectID = id;
      });

    this.dataService.getEmployee(this.objectID).subscribe(
        employeeObj => {
          this.myForm.controls['name'].setValue(employeeObj.name);
          this.myForm.controls['position'].setValue(employeeObj.position);
          employeeObj.subordinatesUserID.forEach((subordinateID) =>
            (<FormArray>this.myForm.controls['subordinatesUserID']).push(this.initSubordinateIDFormGroup(subordinateID)));
        },

        error => console.log(error),

        () => {
          this.isLoading = false;
        }
      );
  }
  initSubordinate(){
    return this.fb.group({
      // _id:[''],
      subordinateID: ['']
    });
  }
  addSubordinate(){
    (<FormArray>this.myForm.controls['subordinatesUserID']).push(this.createSubordinateIDFormGroup());
  }
  removeSubordinate(index: number){
    (<FormArray>this.myForm.controls['subordinatesUserID']).removeAt(index);
  }
  createSubordinateIDFormGroup(){
    return new FormGroup({
      subordinateID: new FormControl('')
    })
  }
  initSubordinateIDFormGroup(subordinateIDObj) {
    // console.log("subordinatesUserIDObj", subordinateIDObj);
    return new FormGroup({
      subordinateID: new FormControl(subordinateIDObj.subordinateID),
    });

  }

  cancelEditing(){
    this.toast.setMessage('item editing canceled', 'warning');
    this.router.navigateByUrl('home');
  }


  editEmployee(employee) {
    this.dataService.editEmployee(this.objectID, employee).subscribe(
      res => {
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error),
      () => {
        this.router.navigateByUrl('home');
      }
    );
  }
}
