import {Component, Input, OnInit} from "@angular/core";
import {HomeComponent} from "../home/home.component";
import {FormBuilder, FormGroup, Validators, FormControl, FormArray} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {ToastComponent} from "../shared/toast/toast.component";
import {isUndefined} from "util";
import {isNullOrUndefined} from "util";
import {CustomValidators} from "../custom-validators/custom.validators";


@Component({
  selector: "add-employee",
  styleUrls: ["add-employee.component.css"],
  template: `

    <!--&lt;!&ndash;<tbody>&ndash;&gt;
    <app-toast [message]="toast.message"></app-toast>
    &lt;!&ndash;<tr>&ndash;&gt;
      &lt;!&ndash;<td colspan="4">&ndash;&gt;
        &lt;!&ndash;#form="ngForm"&ndash;&gt;
    <div id="container" align="center" >
      
      <div id="content"  align="left">
        <form [formGroup]="myForm" (ngSubmit)="addEmployee(myForm.value)" >
        &lt;!&ndash;<div id="left-container" >&ndash;&gt;
          <div class="form-group" >
            <input class="form-control" type="text" formControlName="name" placeholder="Name">
          </div>
          <p *ngIf="myForm.controls.name?.errors && myForm.controls.name.touched">
            The name is required
          </p>
          &lt;!&ndash;<div *ngIf="!form.controls['name'].valid && form.controls['name'].touched" class="alert alert-danger">You must insert a name that has min length of 2 ch and max length of 5 ch.</div>&ndash;&gt;
          <div class="form-group">
            <input class="form-control" type="text" formControlName="userID" 
                   placeholder="User ID" >
          </div>

          <div class="form-group">
            <input class="form-control" type="text" formControlName="position" 
                   placeholder="Position" >
            &lt;!&ndash;<span *ngIf="!myForm.controls.position?.valid && myForm.controls['position'].touched">&ndash;&gt;
            &lt;!&ndash;The title is required!&ndash;&gt;
            &lt;!&ndash;</span>&ndash;&gt;
          </div>
          <div class="form-group">
            <input class="form-control" type="text" formControlName="department" 
                   placeholder="Department">
          </div>
          <div class="form-group">
            <input class="form-control" type="text" formControlName="country" 
                   placeholder="Country">
          </div>
          <div class="form-group">
            <input class="form-control" type="text" formControlName="city"
                   placeholder="City">
          </div>
          <div class="form-group">
            <input class="form-control" type="text" formControlName="email" 
                   placeholder="E-mail">
          </div>
          <div class="form-group">
            <input class="form-control" type="text" formControlName="phoneNumber" 
                   placeholder="Phone Number">
          </div>
          
        &lt;!&ndash;</div>&ndash;&gt;
          &lt;!&ndash;<div id="right-container">&ndash;&gt;
            
            <div class="form-group">
              <input class="form-control" type="text" formControlName="companyAddress"
                      placeholder="Company Address">
            </div>
            <div class="form-group">
              <input class="form-control" type="text" formControlName="office" 
                     placeholder="Office">
            </div>
            <div class="form-group">
              <input class="form-control" type="text" formControlName="fax" 
                     placeholder="Fax #">
            </div>


            <div>
              <div class=" form-inline">
              &lt;!&ndash;<option class="form-control" formControlName="workingHours" [(ngModel)]="employee.department"&ndash;&gt;
              &lt;!&ndash;value="1" >1</option>&ndash;&gt;
              <label>Working Start hour</label>
              <input class="form-control" type="text" onfocus="(this.type='time')" formControlName="startingHours"
                      placeholder="Starting Hours"/>
               &lt;!&ndash;// <button (click)="getStartingHours()">hour</button>&ndash;&gt;
                <div *ngIf="myForm.controls['startingHours'].hasError('required')" class="alert alert-danger">You must select starting time.</div>


              <label>Working Finish hour</label>
              <input  class="form-control" type="text" onfocus="(this.type='time')" formControlName="finishingHours"
                       placeholder="Finishing Hours"/>
                <div *ngIf="myForm.controls['finishingHours'].hasError('required')" class="alert alert-danger">You must select finish time.</div>
              </div>
            </div>
            <div id="id1"  formArrayName="superiorsUserID"  >
              <div *ngFor="let item of myForm.controls.superiorsUserID.controls; let i = index">
                <div id="id2">
                  <span>Superior {{i + 1}}</span>
                    <span *ngIf="myForm.controls.superiorsUserID.controls.length > 0" (click)="removeSuperior(i)">
                      Remove
                    </span>
                </div>
                <div id="id3"[formGroupName]="i">
                    <div>
                        <label>Superior</label>
                        <input class="form-control" type="text" formControlName="superiorID">
                    </div>
                </div>
              
            </div>
              <div id="id4">
                  <a style="cursor: pointer; color: #07C" (click)="addSuperior()">Add superior +</a>
              </div>
            </div>
            <div id="id1" formArrayName="subordinatesUserID" >
              <div *ngFor="let item of myForm.controls.subordinatesUserID.controls; let i = index">
                <div id="id2">
                  <span>Subordinate {{i + 1}}</span>
                    <span *ngIf="myForm.controls.subordinatesUserID.controls.length > 0" (click)="removeSubordinate(i)">
                      Remove
                    </span>
                </div>
                <div id="id3" [formGroupName]="i">
                    <div>
                        <label>Subordinate</label>
                        <input class="form-control" type="text" formControlName="subordinateID">
                    </div>
                </div>

              </div>
              <div id="id4">
                  <a style="cursor: pointer; color: #07C" (click)="addSubordinate()">Add subordinate +</a>
              </div>
            </div>
            &lt;!&ndash;<div class="form-group">&ndash;&gt;
              &lt;!&ndash;<input class="form-control" type="text" formControlName="subordinatesUserID"&ndash;&gt;
                      &lt;!&ndash;placeholder="Subordinates User ID" >&ndash;&gt;
            &lt;!&ndash;</div>&ndash;&gt;
            <div class="form-group">
                  <textarea class="form-control" rows="5" cols="5" type="text" formControlName="urlImage"
                             placeholder="Image"></textarea>
            </div>
          
          &lt;!&ndash;</div>&ndash;&gt;
          
        </form> 
      
      
      <div id="footer">
        <div>
          <button class="btn btn-sm btn-primary" type="submit" [disabled]="!myForm.valid"><i
            class="fa fa-floppy-o"></i> Save
          </button>
          <button class="btn btn-sm btn-warning" (click)="cancelEditing()"><i class="fa fa-times"></i> Cancel
          </button>
        </div>
        
      </div>
        &lt;!&ndash;</td>&ndash;&gt;
        &lt;!&ndash;</tr>&ndash;&gt;
        &lt;!&ndash;</tbody>&ndash;&gt;
    </div>
    </div>-->
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
                <span>Superior {{i + 1}}</span>
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
          <div class="form-group">
                  <textarea class="form-control" rows="3" cols="5" type="text" formControlName="urlImage"
                            placeholder="Image URL"></textarea>
          </div>

          <button class="btn btn-sm btn-primary" type="submit" (click)="addEmployee(myForm.value)" [disabled]="!myForm.valid"><i class="fa fa-floppy-o"></i> Save </button>
          <button class="btn btn-sm btn-warning" (click)="cancelEditing()"><i class="fa fa-times"></i> Cancel </button>
        </form>
      </td>
    </tr>
    </tbody>
        
  `
})
export class AddEmployeeComponent implements OnInit {
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
        name: [''], //['', Validators.compose([Validators.required])],
        userID: [''], //['', Validators.compose([Validators.required])],
        position: [''], //['', Validators.compose([Validators.required])],
        department: [''], //['', Validators.compose([Validators.required])],
        country: [''], //['', Validators.compose([Validators.required])],
        city: [''], //['', Validators.compose([Validators.required])],
        email: [''], //['',Validators.compose([Validators.required, CustomValidators.validateEmail])],
        phoneNumber: [''], //['', Validators.compose([Validators.required])],
        companyAddress:[''], //['', Validators.compose([Validators.required])],
        office: [''], //['', Validators.compose([Validators.required])],
        fax: [''], //['', Validators.compose([Validators.required])],
        startingHours:[''], //['', Validators.compose([Validators.required])],
        finishingHours:[''], //['', Validators.compose([Validators.required])],
        superiorsUserID: this.fb.array([
          // this.initSubordinate()  //  todo change me to initSuperior
        ]),
        subordinatesUserID: this.fb.array([

        ]),

        urlImage: [''], //['', Validators.compose([Validators.required])],

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

    removeSuperior(index: number){
      (<FormArray>this.myForm.controls['superiorsUserID']).removeAt(index);
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
