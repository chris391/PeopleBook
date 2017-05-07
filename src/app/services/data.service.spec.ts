/* tslint:disable:no-unused-variable */
//
// import {TestBed, async, inject, tick, fakeAsync} from '@angular/core/testing';
// import { DataService } from './data.service';
// import {
//   BaseRequestOptions, Http, ConnectionBackend, ResponseOptions, Response, HttpModule,
//   XHRBackend
// } from "@angular/http";
// import {MockBackend} from "@angular/http/testing";
// import {ActivatedRoute} from "@angular/router";
//
// describe('DataService', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       // imports: [HttpModule],
//       providers: [
//         BaseRequestOptions,
//         DataService,
//         MockBackend,
//
//         {
//           provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
//           return new Http(backend, defaultOptions); }, deps: [MockBackend, BaseRequestOptions]
//         }
//       ]
//     });
//   });
//
//     describe('getEmploye()', () =>{
//       it('should return an Observable<any>',inject([DataService, MockBackend], fakeAsync((dataService, mockBackend) => {
//         let response;
//         const mockResponse={
//           data:[
//             {userID: 'P01', name: 'Carlos' },
//             {userID:'P02', name: 'Cris'},
//             {userID:'P03', name: "Coco"}
//           ]
//         };
//
//
//         mockBackend.connections.subscribe((connection) => {
//           expect(connection.request.url).toBe('/employees');
//           // let response = new ResponseOptions({body: '{"name": "Employee 0"}'});
//           let response = new ResponseOptions({body: JSON.stringify(mockResponse)});
//
//           connection.mockRespond(new Response(response));
//
//         });
//
//
//         dataService.getEmployees().subscribe(employees => {
//           response = employees;
//         });
//         tick();
//         // expect(employees.length.toBe(1));
//         expect(response.length).toBe(3);
//         // expect(response[0].userID).toEqual('P01');
//       })))
//     });
//
//   });
//
//
//
