// it('should create a `FormGroup` comprised of `FormControl`s', () => {
//   component.ngOnInit();
//   expect(component.formGroup instanceof FormGroup).toBe(true);
// });
// Filter for DebugElements with a #content reference


import {element, by, browser} from 'protractor'

import {async, ComponentFixture, fakeAsync, getTestBed, inject, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';

import {ToastComponent} from "../shared/toast/toast.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {AddEmployeeComponent} from "../add/add-employee.component";

describe('AddEmployeesComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let paulo = {name: 'Paulo', userID: 'P02', position: 'Jefe', department: 'IT', country: 'Denmark', city: 'Aarhus', email: 'aa@aa.dk', phoneNumber: '222222', companyAddress:'Poul Reichhardtsvej', office: '09', fax: '999999', startingHours:'07:00', finishingHours:'15:00', superiorsUserID: [{superiorID: {userID: 'P01'}}], subordinatesUserID: [{subordinateID: {userID: 'P03'}}], urlImage: 'http://www.images.com',};
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
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, AddEmployeeComponent, ToastComponent, HomeComponent, EditEmployeeComponent, EmployeeProfileComponent, FilterEmployeesPipe, EmployeeThumbnailComponent,
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
        // { provide: Router, useClass: RouterModule}//class{ navigateByUrl = jasmine.createSpy("navigateByUrl")} }
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        // {provide: Router},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    });


    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    // let dataService = fixture.debugElement.injector.get(DataService);
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

  describe('cancelEditing()', () =>{
    it('should match the message ', inject([HomeComponent, ToastComponent,SharedService,DataService], ((homeComponent, toast, shareService, dataService) =>{
      // component.cancelEditing();
      let paulo = {name: 'Paulo', userID: 'P02', position: 'Jefe', department: 'IT', country: 'Denmark', city: 'Aarhus', email: 'aa@aa.dk', phoneNumber: '222222', companyAddress:'Poul Reichhardtsvej', office: '09', fax: '999999', startingHours:'07:00', finishingHours:'15:00', superiorsUserID: [{superiorID: {userID: 'P01'}}], subordinatesUserID: [{subordinateID: {userID: 'P03'}}], urlImage: 'http://www.images.com',};
      component.enableEditing(paulo);
      expect(component.isEditing).toBeTruthy();
      // console.log(toast.message);
      // tick(3000);


      //     // fixture.detectChanges();
      //     // let router: Router = getTestBed().get(Router);
      //     // tick();
      //     // console.log(toast.message);
      //     // expect('item editing canceled').toEqual('item editing canceled')
    })))
  })

});




//"../home/home.component";
// import {browser} from 'protractor/globals';

/*describe('App: Add-Employee', () => {
 beforeEach(() => {
 TestBed.configureTestingModule({
 declarations: [
 AddEmployeeComponent
 ],
 });
 });*/

/*it('should render title in a h1 tag', async(() => {
 let fixture = TestBed.createComponent(AddEmployeeComponent);
 fixture.detectChanges();
 let compiled = fixture.debugElement.nativeElement;
 expect(compiled.querySelector('h1').textContent).toContain('app works!');
 }));*/

/*describe('Add Page:', ()=>{   //not working
 it('should have a title of PeopleBook', ()=>{
 browser.get('/');
 let title = element(by.tagName('title')).getText();
 expect(title).toEqual('Peoplebook');
 })
 })*/


/*it("should show three todos when we first load the todo app", () => {
 //browser.get("/");
 let labels = element.all(by.css(".label .label"));
 expect(labels.count()).toEqual(16);
 })*/
/*});*/
