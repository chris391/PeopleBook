<<<<<<< HEAD

import {async, ComponentFixture, fakeAsync, getTestBed, inject, TestBed, tick} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';

import {ToastComponent} from "../shared/toast/toast.component";
import {FormsModule, ReactiveFormsModule, FormArray} from "@angular/forms";
import {HomeComponent} from "../home/home.component";
import {DataService} from "../services/data.service";
import {Http} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {Observable} from "rxjs";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {EditEmployeeComponent} from "../edit/edit-employee.component";
import {EmployeeProfileComponent} from "../profile/employee-profile.component";
import {FilterEmployeesPipe} from "../pipes/filter-employees.pipe";
import {EmployeeThumbnailComponent} from "../thumbnail/employee-thumbnail.component";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {SharedService} from "../shared/service/shared-service";
import {AppComponent} from "../app.component";
import {RoutingPeopleBook} from "../routing/routing.component";
import {ROUTER_PROVIDERS} from "@angular/router/testing/private_import_router";
import {RouterTestingModule} from "@angular/router/testing";
import {AddEmployeeComponent} from "../add/add-employee.component";
import {By} from "@angular/platform-browser";
import {el} from "@angular/platform-browser/testing/browser_util";

describe('EditEmployeeComponent', () => {
  let component: EditEmployeeComponent;
  let fixture: ComponentFixture<EditEmployeeComponent>;
  let de: DebugElement;
  let el: HTMLInputElement;

  let employee = {name: 'Paulo', userID: 'P02', position: 'Jefe', department: 'IT', country: 'Denmark', city: 'Aarhus', email: 'aa@aa.dk', phoneNumber: '222222', companyAddress:'Poul Reichhardtsvej', office: '09', fax: '999999', startingHours:'07:00', finishingHours:'15:00', superiorsUserID: [{superiorID: {userID: 'P01'}}], subordinatesUserID: [{subordinateID: {userID: 'P03'}}], urlImage: 'http://www.images.com'};
  class MockDataService {
    response = {body: {name: 'Paulo', userID: 'P02'}, status: 200, ok: true, statusText: "OK", headers: 'Content-type: application/json'};

    getEmployess(): Observable<any>{
      return Observable.from([employee]);
    }
    getEmployee(userID: string): Observable<any> {
      return Observable.of(employee);
    }
    addEmployee(employee): Observable<any>{
      return Observable.of(this.response);
    }
    editEmployee(employee): Observable<any>{
      return Observable.of(this.response);
    }
    deleteEmployee(employee): Observable<any>{
      return Observable.of(this.response);
    }
  }

  beforeEach(() => {
    let mockRouter = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, AddEmployeeComponent, ToastComponent, HomeComponent, EditEmployeeComponent, EmployeeProfileComponent, EmployeeThumbnailComponent, FilterEmployeesPipe
      ],
      imports: [
        FormsModule, ReactiveFormsModule,
        RouterModule,
        // RouterTestingModule,
        RoutingPeopleBook
      ],
      providers: [
        HomeComponent, ToastComponent, SharedService,
        { provide: DataService, useClass: MockDataService },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: ActivatedRoute, useValue: {params: Observable.of({id: 'P01'})} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    })
      .compileComponents();


    fixture = TestBed.createComponent(EditEmployeeComponent);
    component = fixture.componentInstance;
    // let dataService = fixture.debugElement.injector.get(DataService);
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('#name'));
    el = de.nativeElement;


  });
  let employee = {name: 'Paulo', userID: 'P02', position: 'Jefe', department: 'IT', country: 'Denmark', city: 'Aarhus', email: 'aa@aa.dk', phoneNumber: '222222', companyAddress:'Poul Reichhardtsvej', office: '09', fax: '999999', startingHours:'07:00', finishingHours:'15:00', superiorsUserID: [{superiorID: {userID: 'P01'}}], subordinatesUserID: [{subordinateID: {userID: 'P03'}}], urlImage: 'http://www.images.com'};

  describe('EditEmployeeComponent:', () => {
    it('should create',  () => {
      expect(component).toBeTruthy();
    })
  });

  xdescribe('cancelEditing', () =>{
    it('should match the message ', inject([Router, HomeComponent, ToastComponent,SharedService,DataService], ((router, homeComponent, toast, shareService, dataService) =>{
      const navigateByUrl = spyOn(router, 'navigateByUrl');
      expect(navigateByUrl.calls.all().length).toEqual(0);

      component.cancelEditing();

      expect(navigateByUrl.calls.all().length).toEqual(1);
      expect(toast.message.body).toEqual('item editing canceled');
      expect(toast.message.type).toEqual('warning');
    })))
  });
  xdescribe('addEmployee', () => {
    it('it should post employee', inject([Router, ToastComponent], (router, toast) =>{
      const navigateByUrl = spyOn(router, 'navigateByUrl');
      // component.addEmployee(employee);

      expect(navigateByUrl.calls.first().args[0]).toEqual('home');
      expect(toast.message).toEqual({body: 'item added successfully', type: 'success'})
    }))
  });
  xdescribe('addSubordinate', () => {
    it('should add a subordinate form control to the form array', () => {

      component.addSubordinate();
      expect((<FormArray>component.myForm.controls['subordinatesUserID']).length === 1).toBe(true);
    })
  });
  describe('ngOnInit', () => {
    it('should set value of FormGroup', inject([ActivatedRoute, Router], (route, router) =>{
      expect(component.myForm.value).toBeDefined();
      let nameElement= fixture.debugElement.query(By.css('#name')).nativeElement;
      expect(nameElement.value).toBe('Paulo');
    }))
  })

});

=======
>>>>>>> parent of e6639ec... PB-0 tests for add-employee, edit-employee tests added
