import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getEmployees(): Observable<any> {
    return this.http.get('/employees').map(res => res.json());
  }

  getEmployee(id: number): Observable<any> {
    // console.log(employee._id);
    return this.http.get(`/employee/${id}`).map(res => res.json());
  }

  addEmployee(employee): Observable<any> {
    return this.http.post('/employee', JSON.stringify(employee), this.options);
  }

  editEmployee(id: number, employee): Observable<any> {
    return this.http.put(`/employee/${id}`, JSON.stringify(employee), this.options);
  }
  // editEmployee(employee): Observable<any> {
  //   return this.http.put(`/employee/${employee._id}`, JSON.stringify(employee), this.options);
  // }

  deleteEmployee(employee): Observable<any> {
    return this.http.delete(`/employee/${employee._id}`, this.options);
  }

}
