import {Component, Input, OnInit} from "@angular/core";
import {HomeComponent} from "../home/home.component";
import {FormBuilder, FormGroup, Validators, FormControl, FormArray} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {ToastComponent} from "../shared/toast/toast.component";
import {CustomValidators} from "../custom-validators/custom.validators";

@Component({
  selector: "edit-employee",
  styleUrls: ["edit-employee.component.css"],
  templateUrl: "edit-employee.component.html"
})
export class EditEmployeeComponent {
  isLoading = true;
  public myForm: FormGroup;
  form: FormGroup;
  private objectID: any;

  constructor(private homeComponent: HomeComponent, private fb: FormBuilder, private route: ActivatedRoute, private dataService: DataService, private router: Router, private toast: ToastComponent) {}

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

    //getting the id of the selected employee
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        this.objectID = id;
      });

    this.dataService.getEmployee(this.objectID).subscribe(
        employeeObj => {
          this.myForm.controls['name'].setValue(employeeObj.name);
          this.myForm.controls['userID'].setValue(employeeObj.userID);
          this.myForm.controls['position'].setValue(employeeObj.position);
          this.myForm.controls['department'].setValue(employeeObj.department);
          this.myForm.controls['country'].setValue(employeeObj.country);
          this.myForm.controls['city'].setValue(employeeObj.city);
          this.myForm.controls['email'].setValue(employeeObj.email);
          this.myForm.controls['phoneNumber'].setValue(employeeObj.phoneNumber);
          this.myForm.controls['companyAddress'].setValue(employeeObj.companyAddress);
          this.myForm.controls['office'].setValue(employeeObj.office);
          this.myForm.controls['fax'].setValue(employeeObj.fax);
          this.myForm.controls['startingHours'].setValue(employeeObj.startingHours);
          this.myForm.controls['finishingHours'].setValue(employeeObj.finishingHours);
          this.myForm.controls['urlImage'].setValue(employeeObj.urlImage);
          employeeObj.superiorsUserID.forEach((superiorID) =>
            (<FormArray>this.myForm.controls['superiorsUserID']).push(this.initSuperiorIDFormGroup(superiorID)));
          employeeObj.subordinatesUserID.forEach((subordinateID) =>
            (<FormArray>this.myForm.controls['subordinatesUserID']).push(this.initSubordinateIDFormGroup(subordinateID)));
        },

        error => console.log(error),

        () => {
          this.isLoading = false;
        }
      );
  }

  addSuperior(){
    (<FormArray>this.myForm.controls['superiorsUserID']).push(this.createSuperiorIDFormGroup());
  }
  removeSuperior(index: number){
    (<FormArray>this.myForm.controls['superiorsUserID']).removeAt(index);
  }
  createSuperiorIDFormGroup(){
    return new FormGroup({
      superiorID: new FormControl('')
    })
  }
  initSuperiorIDFormGroup(superiorIDObj) {
    // console.log("subordinatesUserIDObj", subordinateIDObj);
    return new FormGroup({
      superiorID: new FormControl(superiorIDObj.superiorID),
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
    // console.log(this.myForm.value);
    this.toast.setMessage('item editing canceled', 'warning');
    this.router.navigateByUrl('home');
  }


  editEmployee(employee) {
    this.dataService.editEmployee(employee).subscribe(
      //todo remove res
      res => {
      },
      error =>{
        if (error.status===412){
          console.log(error);
          // console.log('MY ERROR');
          window.alert('UserID has to be unique!')
        }else{
          console.log(error)
        }
      } ,
      () => {
        this.router.navigateByUrl('home');
        this.toast.setMessage('item edited successfully.', 'success');
      }
    );
  }
}
