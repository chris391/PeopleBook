/* tslint:disable:no-unused-variable */

import {TestBed, async, inject, tick, fakeAsync} from '@angular/core/testing';
import { DataService } from './data.service';
import {
  BaseRequestOptions, Http, ConnectionBackend, ResponseOptions, Response, HttpModule, Headers
} from "@angular/http";
import {MockBackend} from "@angular/http/testing";

//tests including successful scenarios and custom error status except errors on the server-side e.g. db down, internet failure
describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        DataService,
        MockBackend,
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions); }, deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

    describe('getEmployees()', () =>{
      it('should return an Observable<any> with employees',inject([DataService, MockBackend], fakeAsync((dataService, mockBackend) => {
        const mockResponse = [
          {userID: 'P01', name: 'Carlos'},
          {userID:'P02', name: 'Cris'},
          {userID:'P03', name: 'Henny'}
          ];
        let response;

        mockBackend.connections.subscribe((connection) => {
          expect(connection.request.url).toBe('/employees');
          let response = new ResponseOptions({body: mockResponse});
          // let response = new ResponseOptions({body: JSON.stringify(mockResponse)});

          connection.mockRespond(new Response(response));
        });


        dataService.getEmployees().subscribe(mockResponse => {
          response = mockResponse;
        });
        tick();
        expect(response.length).toBe(3);
        expect(response[0].name).toEqual('Carlos');
        expect(response[2].userID).toEqual('P03');
      })))
    });

  describe('getEmployee(id)', () =>{
    it('should return an Observable<any> with an employee',inject([DataService, MockBackend], fakeAsync((dataService, mockBackend) => {
      const mockResponse = [
        {userID: 'P01', name: 'Carlos'},
        {userID: 'P02', name: 'Cris'},
        {userID: 'P03', name: 'Henny'}];
      let response;

      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toBe('/employee/P01');
        let response = new ResponseOptions({body: mockResponse[0]});
        // let response = new ResponseOptions({body: JSON.stringify(mockResponse)});

        connection.mockRespond(new Response(response));

      });

      dataService.getEmployee('P01').subscribe(mockResponse => {
        response = mockResponse;
      });
      tick();
      expect(response).toBeTruthy();
      expect(response.name).toEqual('Carlos');
    })))
  });

  describe('addEmployee(employee)', () => {
    it('should add desired employee', inject([DataService, MockBackend], fakeAsync((dataService, mockBackend) =>{

      let employee = {userID: 'P01', name: 'Marco'};
      let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
      let response;

      mockBackend.connections.subscribe((connection) => {

        expect(connection.request.url).toBe('/employee');

        let options = new ResponseOptions();
        let response = new Response(options.merge({body: employee, status: 200, headers: headers}));

        connection.mockRespond(response);

      });

      dataService.addEmployee(employee).subscribe(mockResponse => {
        response = mockResponse;
      });
      tick();
      expect(response.status).toBe(200);
      expect(response.headers).toBe(headers);
      expect(response._body.name).toBe('Marco');
    })));

    it('should send status 412 if object added doesnt contain unique user ID', inject([DataService, MockBackend], fakeAsync((dataService, mockBackend) =>{

    let employee = {userID: 'P01', name: 'Leon'}; //an employee with this userID already exists
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    let response;

    mockBackend.connections.subscribe((connection) => {

      expect(connection.request.url).toBe('/employee');

      let options = new ResponseOptions();
      let response = new Response(options.merge({body: employee, status: 412, headers: headers}));

      connection.mockRespond(response);

    });

    dataService.addEmployee(employee).subscribe(mockResponse => {
      response = mockResponse;
    });
    tick();
    expect(response.status).toBe(412);
  })))
});

  describe('editEmployee(employee)', () => {
    it('should update desired employee', inject([DataService, MockBackend], fakeAsync((dataService, mockBackend) =>{


      let employee = {userID: 'P03', name: 'Henny'};
      let updatedEmployee = {userID: 'P03', name: 'Hennessy'};
      let response;

      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toBe('/employee/P03');
        let response = new ResponseOptions({status:200});
        // let response = new ResponseOptions({body: JSON.stringify(mockResponse)});

        connection.mockRespond(new Response(response));

      });

      dataService.editEmployee(updatedEmployee).subscribe(mockResponse => {
        response = mockResponse;
      });
      tick();
      expect(response).toBeTruthy();
      expect(response.status).toBe(200);
    })))
  });

  describe('deleteEmployee(employee)', () => {
    it('should delete desired employee', inject([DataService, MockBackend], fakeAsync((dataService, mockBackend) =>{
      let employee = {userID: 'P01', name: 'Carlos'};
      let response;
      mockBackend.connections.subscribe(connection =>{
        // let response = new ResponseOptions({body: JSON.stringify(mockResponse)});
        expect(connection.request.url).toBe('/employee/P01');
        let options = new ResponseOptions({status: 200});

        connection.mockRespond(new Response(options));

      });
      dataService.deleteEmployee(employee).subscribe(mockResponse =>{
        response = mockResponse;
      });
      tick();
      expect(response).toBeDefined(true);
      expect(response.status).toBe(200);
    })))
  });
});


