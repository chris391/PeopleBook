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
  private employee= {
    // _id: 0,
    // __v: 0,
    name: '',
    position: '',
    subordinatesUserID:[]
  };
  myModel: any;
  form: FormGroup;
  private objectID: any;

  constructor(private homeComponent: HomeComponent, private fb: FormBuilder, private route: ActivatedRoute, private dataService: DataService, private router: Router, private toast: ToastComponent) {
    this.myModel ={
      name: 'Joanna',
      position: 'CEO',
      subordinatesUserID:[{subordinateID: 'G42'},{subordinateID: 'G43'}]
    };
    this.form = this.fb.group({
      name: new FormControl(''),
      position: new FormControl(''),
      subordinatesUserID: new FormArray([])
    });
    // this.form.setValue(this.myModel);
    (<FormControl>this.form.controls['name']).setValue(this.myModel.name);
    (<FormControl>this.form.controls['position']).setValue(this.myModel.position);
    this.myModel.subordinatesUserID.forEach((subordinateID) =>

      (<FormArray>this.form.controls['subordinatesUserID']).push(this.initSubordinateIDFormGroup(subordinateID)));

    // console.log(this.form.value);
  }

  object = {};
  ngOnInit() {

    this.myForm = this.fb.group({
      // _id:new FormControl(),
      // __v:new FormControl(),
      name: [''],
      position: new FormControl(''),
      subordinatesUserID: this.fb.array([
        // this.initSubordinate()
      ])
    });

    //getting the id of the selected employee
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        this.objectID = id;
      });

    this.dataService.getEmployee(this.objectID).subscribe(
        employeeObj => {
          // console.log(employeeObj);

          this.myForm.controls['name'].setValue(employeeObj.name);
          this.myForm.controls['position'].setValue(employeeObj.position);
          employeeObj.subordinatesUserID.forEach((subordinateID) =>

            (<FormArray>this.myForm.controls['subordinatesUserID']).push(this.initSubordinateIDFormGroup(subordinateID)));

          console.log(this.myForm.value);



          // this.employee = employeeObj;
          // this.object = data;

          // this.myForm.setValue(employeeObj);

          // this.myForm.controls['subordinatesUserID'].patchValue(data.subordinatesUserID);
          // let controlArray = <FormArray>this.myForm.controls['subordinatesUserID'];
          // this.employee.subordinatesUserID.forEach((subordinateObj, index) => {
            // (<FormArray>this.myForm.controls['subordinatesUserID']).push(new FormControl({subordinateID: 'hi'}));
            // (<FormArray>this.myForm.controls['subordinatesUserID']).push(new FormControl(subordinateObj));
            // console.log(subordinateObj.subordinateID);
            // }
          // );

          // this.employee.subordinatesUserID.forEach(subordinateObj => {
          //   (<FormArray>this.myForm.controls['']).push(subordinateObj.subordinateID);
            // const fb = this.buildGroup();
            // this.myForm.controls['subordinatesUserID'].patchValue(id);
            // fb.patchValue(id);
            // controlArray.push();
          // });
          // this.myForm.controls['subordinatesUserID'].setValue(data.subordinatesUserID);
          // this.myForm.controls['name'].setValue(data.name);
          // this.myForm.controls['position'].setValue(data.position);
          // this.myForm.controls['subordinatesUserID'].setValue(data.subordinatesUserID);
          // this.employee = data;

        },

        error => console.log(error),

        () => {
          // this.myForm.patchValue(this.object);
          console.log('on complete');
          // console.log(this.object);

          // this.myForm.patchValue(this.object);
          // this.myForm.patchValue(this.employee);
          // this.myForm.setValue(this.employee);
          console.log(this.myForm.value);
          this.isLoading = false;
        }
      );
  //   }
  // else if(this.objectID===undefined){
  //     this.isLoading = false;
  //   }
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

    // this.homeComponent.toastCanceledEditing();
    this.toast.setMessage('item editing canceled', 'warning');
    this.router.navigateByUrl('home');
    // console.log(this.myForm.value);
    // console.log(this.myForm.valid.valueOf());
    // this.homeComponent.cancelEditing();
  }


  editEmployee(employee) {
    // console.log(employee);
    // console.log(employee._id);
    this.dataService.editEmployee(this.objectID, employee).subscribe(
      res => {
        // this.isEditing = false;
        // this.employee = employee;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error),
      () => {
        this.router.navigateByUrl('home');
      }
    );
  }

  getEmployee() {

      var adduser = {
        name: this.myForm.controls['name'].value,
        position: this.myForm.controls['position'].value,
        subordinatesUserID: this.myForm.controls['subordinatesUserID'].value,

      };
      console.log(adduser);// adduser var contains all our form values. store it where you want
      // this.addForm.reset();// this will reset our form values to null
}


}
