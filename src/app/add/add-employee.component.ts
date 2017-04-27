import {Component, Input, OnInit} from "@angular/core";
import {HomeComponent} from "../home/home.component";
import {FormBuilder, FormGroup, Validators, FormControl, FormArray, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {ToastComponent} from "../shared/toast/toast.component";

@Component({
  selector: "add-employee",
  styleUrls: ["add-employee.component.css"],
  template:`

  <app-toast [message]="toast.message"></app-toast>
  <tbody>
        <tr>
          <td colspan="4">
            <form [formGroup]="myForm">
              <div class="form-group">
                  <input class="form-control" type="text" formControlName="name" [(ngModel)]="employee.name" placeholder="Name"> 
              </div>
     
              <div class="form-group">
                  <input class="form-control" type="text" formControlName="position" [(ngModel)]="employee.position" placeholder="Position">
              </div>
              <div class="form-group">
                <input class="form-control" type="text" formControlName="department" 
                   placeholder="Department" required>
              </div>
              <div class="form-group">
                <input class="form-control" type="text" formControlName="country" 
                       placeholder="Country" required>
              </div>
              <div class="form-group">
                <input class="form-control" type="text" formControlName="city"
                       placeholder="City" required>
              </div>
              <div class="form-group">
                <input class="form-control" type="text" formControlName="email" 
                       placeholder="E-mail" required>
              </div>
              <div class="form-group">
                <input class="form-control" type="text" formControlName="phoneNumber" 
                       placeholder="Phone Number" required>
              </div>
              <div class="form-group">
                <input class="form-control" type="text" formControlName="companyAddress"
                      placeholder="Company Address" required>
              </div>
              <div class="form-group">
                <input class="form-control" type="text" formControlName="office" 
                       placeholder="Office" required>
              </div>
              <div class="form-group">
                <input class="form-control" type="text" formControlName="fax" 
                       placeholder="Fax #">
              </div>
              <div class="form-group">
                <label> Start hour </label>
                  <input class="form-control" type="text" onfocus="(this.type='time')" formControlName="startingHours" 
                  placeholder="Starting Hours" required/>
              </div>  
              <div class="form-group">
                <label> Finish hour </label>
                  <input  class="form-control" type="text" onfocus="(this.type='time')" formControlName="finishingHours"
                         placeholder="Finishing Hours" required/>
              </div>
              
               <div formArrayName="superiorsUserID"> 
                <div *ngFor="let address of myForm.controls.superiorsUserID.controls; let i=index">
                  <div>
                    <span>Subordinate {{i + 1}}</span>
                    <span *ngIf="myForm.controls.superiorsUserID.controls.length > 0" (click)="removeSuperior(i)" style="cursor: pointer; color: #07C">
                      Remove -
                    </span>
                  </div>
                <!-- Angular assigns array index as group name by default 0, 1, 2, ... -->
                <div [formGroupName]="i">
                  <div>
                      <!--<label>Superior</label>-->
                      <input class="form-control" type="text" formControlName="superiorID">
                  </div>
                </div>
              </div>
              </div>
              <div class="margin-20">
                <a style="cursor: pointer; color: #07C" (click)="addSuperior()">Add superior +</a>
              </div>
              <div formArrayName="subordinatesUserID"> 
                <div *ngFor="let address of myForm.controls.subordinatesUserID.controls; let i=index">
                  <div>
                    <span>Subordinate {{i + 1}}</span>
                    <span *ngIf="myForm.controls.subordinatesUserID.controls.length > 0" (click)="removeSubordinate(i)" style="cursor: pointer; color: #07C">
                      Remove -
                    </span>
                  </div>
                <!-- Angular assigns array index as group name by default 0, 1, 2, ... -->
                <div [formGroupName]="i">
                  <div>
                      <!--<label>Subordinate</label>-->
                      <input class="form-control" type="text" formControlName="subordinateID">
                  </div>
                </div>
              </div>
              </div>
              <div class="margin-20">
                <a style="cursor: pointer; color: #07C" (click)="addSubordinate()">Add another subordinate +</a>
              </div>
              
              <button class="btn btn-sm btn-primary" type="submit" (click)="addEmployee(myForm.value)" [disabled]="!myForm.valid"><i class="fa fa-floppy-o"></i> Save </button>
              <button class="btn btn-sm btn-warning" (click)="cancelEditing()"><i class="fa fa-times"></i> Cancel </button>
            </form>
          </td>
        </tr>
      </tbody>
`
})
export class AddEmployeeComponent implements OnInit{
  // @Input() editEmployeeTarget: any;

  // times:  [{'0','1','2','3','4','5','6','7','8','9','10','11','12'}];
  isLoading = true;
  myForm: FormGroup;
  /*myForm =  new FormGroup({
   name: new FormControl(),
   position: new FormControl(),
   department: new FormControl(),
   country: new FormControl(),
   city: new FormControl(),

   });*/
  private employee = {
    name: '',
    position: '',
    department: '',
    superiorName: '',
    subordinateName: '',
    urlImage: ''
  };

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

    this.myForm = this.fb.group({
      name: [''],
      userID: [''],
      position: [''],
      department: [''],
      country: [''],
      city: [''],
      email: [''],
      phoneNumber: [''],
      companyAddress:[''],
      office: [''],
      fax: [''],
      startingHours:[''],
      finishingHours:[''],
      superiorsUserID: this.fb.array([
        // this.initSubordinate()  //  todo change me to initSuperior
      ]),
      subordinatesUserID: this.fb.array([

      ]),

      urlImage: [''],

    });
  }

  addSuperior(){
    (<FormArray>this.myForm.controls['superiorsUserID']).push(this.createSuperiorIDFormGroup())
  }
  createSuperiorIDFormGroup(){
    return new FormGroup({
      superiorID : new  FormControl('')
    })
  }
  addSubordinate(){
    (<FormArray>this.myForm.controls['subordinatesUserID']).push(this.createSubordinateIDFormGroup())
  }
  removeSubordinate(index: number){
    (<FormArray>this.myForm.controls['subordinatesUserID']).removeAt(index);
  }
  createSubordinateIDFormGroup(){
    return new FormGroup({
      subordinateID : new  FormControl('')
    })
  }


  initSubordinate(){
    return this.fb.group({
      subordinateID:['']
    });
  }

  cancelEditing() {

    // this.homeComponent.getEmployees();
    this.homeComponent.toastCanceledEditing();
    this.router.navigateByUrl('home');
    // console.log(this.myForm.value);
    // console.log(this.myForm.valid.valueOf());
    // this.homeComponent.cancelEditing();
  }


  addEmployee() {
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
