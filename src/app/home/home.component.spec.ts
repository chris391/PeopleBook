<<<<<<< HEAD
import {async, ComponentFixture, fakeAsync, getTestBed, inject, TestBed, tick} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {ToastComponent} from "../shared/toast/toast.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "../home/home.component";
import {DataService} from "../services/data.service";
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
import {AddEmployeeComponent} from "../add/add-employee.component";

describe('HomeComponent', () => {
  let component:  HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let paulo = {name: 'Paulo', userID: 'P01', position: 'Jefe', department: 'IT', country: 'Denmark', city: 'Aarhus', email: 'aa@aa.dk', phoneNumber: '222222', companyAddress:'Poul Reichhardtsvej', office: '09', fax: '999999', startingHours:'07:00', finishingHours:'15:00', superiorsUserID: [{superiorID: {userID: 'P01'}}], subordinatesUserID: [{subordinateID: {userID: 'P03'}}], urlImage: 'http://www.images.com',};
  let joli = {name: 'Joli', userID: 'P02', position: 'Jefe', department: 'IT', country: 'Denmark', city: 'Aarhus', email: 'aa@aa.dk', phoneNumber: '222222', companyAddress:'Poul Reichhardtsvej', office: '09', fax: '999999', startingHours:'07:00', finishingHours:'15:00', superiorsUserID: [{superiorID: {userID: 'P01'}}], subordinatesUserID: [{subordinateID: {userID: 'P03'}}], urlImage: 'http://www.images.com',};
  let employees = [paulo, joli];
  class MockDataService {
    response = {body: {name: 'Paulo', userID: 'P02'}, status: 200, ok: true, statusText: "OK", headers: 'Content-type: application/json'};

    getEmployees(): Observable<any>{
      return Observable.of(employees);
    }
    getEmployee(userID: string): Observable<any> {
      return Observable.of(paulo);
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
      navigate: jasmine.createSpy('navigate')
    };
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, AddEmployeeComponent, ToastComponent, HomeComponent, EditEmployeeComponent, EmployeeProfileComponent, FilterEmployeesPipe, EmployeeThumbnailComponent,
      ],
      imports: [
        FormsModule, ReactiveFormsModule,
        //RouterModule,
        RoutingPeopleBook
      ],
      providers: [
        HomeComponent, ToastComponent, SharedService,
        {provide: DataService, useClass: MockDataService },
        {provide: LocationStrategy, useClass: HashLocationStrategy},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  paulo = {name: 'Paulo', userID: 'P02', position: 'Jefe', department: 'IT', country: 'Denmark', city: 'Aarhus', email: 'aa@aa.dk', phoneNumber: '222222', companyAddress:'Poul Reichhardtsvej', office: '09', fax: '999999', startingHours:'07:00', finishingHours:'15:00', superiorsUserID: [{superiorID: {userID: 'P01'}}], subordinatesUserID: [{subordinateID: {userID: 'P03'}}], urlImage: 'http://www.images.com',};
  describe('HomeComponent:', () => {
    it('should create',  () => {
      expect(component).toBeTruthy();
    })
  });
  describe('enableEditing', () =>{
    it('should match the message', inject([HomeComponent, ToastComponent,SharedService,DataService], ((homeComponent, toast, shareService, dataService) =>{
      expect(component.employee).toEqual({});
      component.enableEditing(paulo);
      expect(component.isEditing).toEqual(true);
      expect(component.employee).toBeTruthy();
    })))
  });
  describe('gotoAddEmployee', () =>{
    it('should navigate to add route', inject([Router],((router) =>{
      const  spy = spyOn(router, 'navigate');
      component.gotoAddEmployee();
      const url = spy.calls.first().args[0];
      expect(url).toEqual(['/add']);
    })))
  });
  describe('getEmployees', ()=>{
    it('should get all employees',() =>{
      component.getEmployees();
      expect(component.employees.length).toBeGreaterThanOrEqual(1);
      expect(component.isLoading).toBeFalsy();
    })
  })
});

=======
>>>>>>> parent of e6639ec... PB-0 tests for add-employee, edit-employee tests added
