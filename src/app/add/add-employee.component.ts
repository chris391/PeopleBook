import {Component, Input, OnInit} from "@angular/core";
import {HomeComponent} from "../home/home.component";
import {FormBuilder, FormGroup, Validators, FormControl, FormArray, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {ToastComponent} from "../shared/toast/toast.component";

@Component({
  selector: "add-employee",
  styleUrls: ["add-employee.component.css"],
  templateUrl:"add-employee.component.html"
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
