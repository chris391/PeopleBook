/* tslint:disable:no-unused-variable */

import {TestBed, async, inject, tick, fakeAsync} from '@angular/core/testing';
import { DataService } from './data.service';
import {
  BaseRequestOptions, Http, ConnectionBackend, ResponseOptions, Response, HttpModule,
  XHRBackend
} from "@angular/http";
import {MockBackend} from "@angular/http/testing";

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports: [HttpModule],
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

    describe('getEmploye()', () =>{
      it('should return an Observable<any>',inject([DataService, MockBackend], fakeAsync((dataService, mockBackend) => {
        var response;

        mockBackend.connections.subscribe((connection) => {
          expect(connection.request.url).toBe('/employees');
          let response = new ResponseOptions({body: '{"name": "Employee 0"}'});

          connection.mockRespond(new Response(response));

        });


        dataService.getEmployees().subscribe(_response => {
          response = _response;
        });
        tick();
        // console.log(employees);
        // expect(employees.length.toBe(1));
        expect(response.name).toEqual('Employee 0');
      })))
    });

  });


