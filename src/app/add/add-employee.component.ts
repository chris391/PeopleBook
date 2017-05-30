import {Component, Input, OnInit} from "@angular/core";
import {HomeComponent} from "../home/home.component";
import {FormBuilder, FormGroup, Validators, FormControl, FormArray, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {ToastComponent} from "../shared/toast/toast.component";
import {CustomValidators} from "../custom-validators/custom.validators";

@Component({
  selector: "add-employee",
  styleUrls: ["add-employee.component.css"],
  templateUrl: "add-employee.component.html"
})
export class AddEmployeeComponent implements OnInit{
  isLoading = true;
  myForm: FormGroup;

  constructor(private homeComponent: HomeComponent,
              private fb: FormBuilder,
              private dataService: DataService,
              private router: Router,
              private toast: ToastComponent) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      userID: ['', Validators.compose([Validators.required, CustomValidators.validateUserID])],
      position: ['', Validators.compose([Validators.required])],
      department: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, CustomValidators.validateEmail])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      companyAddress:['', Validators.compose([Validators.required])],
      office: ['', Validators.compose([Validators.required])],
      fax: ['', Validators.compose([Validators.required])],
      startingHours:['', Validators.compose([Validators.required])],
      finishingHours:['', Validators.compose([Validators.required])],
      superiorsUserID: this.fb.array([]),
      subordinatesUserID: this.fb.array([]),
      urlImage: ['', Validators.compose([Validators.required])],
    });
  }

  addSuperior(){
    (<FormArray>this.myForm.controls['superiorsUserID']).push(this.createSuperiorIDFormGroup())
  }
  removeSuperior(index: number){
    (<FormArray>this.myForm.controls['superiorsUserID']).removeAt(index);
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

  cancelEditing() {
    this.toast.setMessage('item editing canceled', 'warning');
    this.router.navigateByUrl('home');
  }

  addEmployee(employee) {
    this.dataService.addEmployee(employee).subscribe(
      res => {

      },
      error => {
        if(error.status === 412){
          console.log(error);
          window.alert('UserID has to be unique!');
        } else {
          console.log(error);
        }
      },
      () => {
        this.toast.setMessage('item added successfully', 'success');
        this.router.navigateByUrl('home');
      }
    )
  }
}
