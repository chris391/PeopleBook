import {Component, Input, OnInit} from "@angular/core";
import {HomeComponent} from "../home/home.component";
import {FormBuilder, FormGroup, Validators, FormControl, FormArray, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {ToastComponent} from "../shared/toast/toast.component";

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
              private route: ActivatedRoute,
              private dataService: DataService,
              private router: Router,
              private toast: ToastComponent) {

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: [''], //['', Validators.compose[Validators.required]]
      userID: [''], //['', Validators.compose[Validators.required]]
      position: [''], //['', Validators.compose[Validators.required]]
      department: [''], //['', Validators.compose[Validators.required]]
      country: [''],  //['', Validators.compose[Validators.required]]
      city: [''], //['', Validators.compose[Validators.required]]
      email: [''],  //['', Validators.compose[Validators.required, CustomValidators.emailValidator]]
      phoneNumber: [''],  //['', Validators.compose[Validators.required]]
      companyAddress:[''],  //['', Validators.compose[Validators.required]]
      office: [''], //['', Validators.compose[Validators.required]]
      fax: [''],  //['', Validators.compose[Validators.required]]
      startingHours:[''], //['', Validators.compose[Validators.required]]
      finishingHours:[''],  //['', Validators.compose[Validators.required]]
      superiorsUserID: this.fb.array([]),
      subordinatesUserID: this.fb.array([]),
      urlImage: [''], //['', Validators.compose[Validators.required]]
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
    // console.log(this.myForm.value);
    this.homeComponent.toastCanceledEditing();
    this.router.navigateByUrl('home');
  }

  addEmployee(employee) {
    this.dataService.addEmployee(employee).subscribe(
      res => {
        this.toast.setMessage('item added successfully', 'success');
      },
      error => console.log(error),
      () => {
        this.router.navigateByUrl('home');
      }
    )
  }
}
