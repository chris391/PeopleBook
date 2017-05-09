// it('should create a `FormGroup` comprised of `FormControl`s', () => {
//   component.ngOnInit();
//   expect(component.formGroup instanceof FormGroup).toBe(true);
// });
// Filter for DebugElements with a #content reference


import {element, by, browser} from 'protractor'

import {async, ComponentFixture, fakeAsync, getTestBed, inject, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';

import {AddEmployeeComponent} from './add-employee.component';
import {ToastComponent} from "../shared/toast/toast.component";
import {FormArray, FormsModule, ReactiveFormsModule} from "@angular/forms";
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

describe('AddEmployeesComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;

  let employee = {name: 'Paulo', userID: 'P02', position: 'Jefe', department: 'IT', country: 'Denmark', city: 'Aarhus', email: 'aa@aa.dk', phoneNumber: '222222', companyAddress:'Poul Reichhardtsvej', office: '09', fax: '999999', startingHours:'07:00', finishingHours:'15:00', superiorsUserID: [{superiorID: {userID: 'P01'}}], subordinatesUserID: [{subordinateID: {userID: 'P03'}}], urlImage: 'http://www.images.com',};
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
        AppComponent, AddEmployeeComponent, ToastComponent, HomeComponent, EditEmployeeComponent, EmployeeProfileComponent, EmployeeThumbnailComponent, FilterEmployeesPipe,
      ],
      imports: [
        FormsModule, ReactiveFormsModule,
        // RouterModule,
        // RouterTestingModule,
        RoutingPeopleBook
      ],
      providers: [
        HomeComponent, ToastComponent, SharedService,
        {provide: DataService, useClass: MockDataService },
        // { provide: Router, useValue: mockRouter},//class{ navigateByUrl = jasmine.createSpy("navigateByUrl")} }
        {provide: LocationStrategy, useClass: HashLocationStrategy},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    });


    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
    // let dataService = fixture.debugElement.injector.get(DataService);
    let home = fixture.debugElement.injector.get(HomeComponent);
    let toast = fixture.debugElement.injector.get(ToastComponent);

    fixture.detectChanges();
    // de = fixture.debugElement.query(By.css('.welcome'));
    // el = de.nativeElement;


  });

  describe('AddEmployeeComponent:', () => {
    it('should create',  () => {
      expect(component).toBeTruthy();
    })
  });

  describe('cancelEditing', () =>{
    it('should match the message ', inject([Router, HomeComponent, ToastComponent,SharedService,DataService], ((router, homeComponent, toast, shareService, dataService) =>{
      const navigateByUrl = spyOn(router, 'navigateByUrl');
      expect(navigateByUrl.calls.all().length).toEqual(0);
      component.cancelEditing();
      expect(navigateByUrl.calls.all().length).toEqual(1);

      expect(toast.message.body).toEqual('item editing canceled');
      expect(toast.message.type).toEqual('warning');

    })))
  })
  describe('addEmployee', ()=>{
    it('should post employee', inject([Router, ToastComponent], ((router,toast)=>{
      const navigateByUrl = spyOn(router, 'navigateByUrl');
      // expect(navigateByUrl.calls.first().args[0]);
      component.addEmployee(employee);
      expect(navigateByUrl.calls.first().args[0]).toEqual('home');
      expect(toast.message.body).toEqual('item added successfully');
      expect(toast.message.type).toEqual('success')
    })))
  })
  describe('addSubordinate', ()=>{
    it('should add subordinate',() =>{
      component.addSubordinate();
      expect((<FormArray>component.myForm.controls['subordinatesUserID']).length).toEqual(1);
    })
  })
});


// it('should create a `FormGroup` comprised of `FormControl`s', () => {
//   component.ngOnInit();
//   expect(component.formGroup instanceof FormGroup).toBe(true);
// });
// Filter for DebugElements with a #content reference


  import {element, by, browser} from 'protractor'

  import {async, ComponentFixture, fakeAsync, getTestBed, inject, TestBed, tick} from '@angular/core/testing';
  import {By} from '@angular/platform-browser';
  import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';

  import {AddEmployeeComponent} from './add-employee.component';
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
import {RoutingPeopleBook} from "../routing/routing.module";
import {ROUTER_PROVIDERS} from "@angular/router/testing/private_import_router";
import {RouterTestingModule} from "@angular/router/testing";

  describe('AddEmployeesComponent', () => {
    let component: AddEmployeeComponent;
    let fixture: ComponentFixture<AddEmployeeComponent>;

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
          {provide: DataService, useClass: MockDataService },
          // { provide: Router, useValue: mockRouter },
          {provide: LocationStrategy, useClass: HashLocationStrategy},
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]

      });


      fixture = TestBed.createComponent(AddEmployeeComponent);
      component = fixture.componentInstance;
      // let dataService = fixture.debugElement.injector.get(DataService);
      // let home = fixture.debugElement.injector.get(HomeComponent);
      // let toast = fixture.debugElement.injector.get(ToastComponent);

      fixture.detectChanges();
      // de = fixture.debugElement.query(By.css('.welcome'));
      // el = de.nativeElement;


    });
    let employee = {name: 'Paulo', userID: 'P02', position: 'Jefe', department: 'IT', country: 'Denmark', city: 'Aarhus', email: 'aa@aa.dk', phoneNumber: '222222', companyAddress:'Poul Reichhardtsvej', office: '09', fax: '999999', startingHours:'07:00', finishingHours:'15:00', superiorsUserID: [{superiorID: {userID: 'P01'}}], subordinatesUserID: [{subordinateID: {userID: 'P03'}}], urlImage: 'http://www.images.com'};

    describe('AddEmployeeComponent:', () => {
      it('should create',  () => {
        expect(component).toBeTruthy();
      })
    });

    describe('cancelEditing', () =>{
      it('should match the message ', inject([Router, HomeComponent, ToastComponent,SharedService,DataService], ((router, homeComponent, toast, shareService, dataService) =>{
        const navigateByUrl = spyOn(router, 'navigateByUrl');
        expect(navigateByUrl.calls.all().length).toEqual(0);

        component.cancelEditing();

        expect(navigateByUrl.calls.all().length).toEqual(1);
        expect(toast.message.body).toEqual('item editing canceled');
        expect(toast.message.type).toEqual('warning');
      })))
    });
    describe('addEmployee', () => {
      it('it should post employee', inject([Router, ToastComponent], (router, toast) =>{
        const navigateByUrl = spyOn(router, 'navigateByUrl');
        component.addEmployee(employee);

        expect(navigateByUrl.calls.first().args[0]).toEqual('home');
        expect(toast.message).toEqual({body: 'item added successfully', type: 'success'})
      }))
    });
    describe('addSubordinate', () => {
      it('should add a subordinate form control to the form array', () => {

        component.addSubordinate();
        expect((<FormArray>component.myForm.controls['subordinatesUserID']).length === 1).toBe(true);
      })
    })

  });
