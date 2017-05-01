import {Injectable} from "@angular/core";
import {Subject, BehaviorSubject} from "rxjs";
/**
 * Created by Cristian on 27/04/2017.
 */
@Injectable()
export class SharedService {
  private searchInput = new Subject();
  private employee = new Subject();


  getSearchData() {
    return this.searchInput;
  }

  updateSearchData(data: string) {
    this.searchInput.next(data);
  }
  getEmployee(){
    return this.employee;
  }
  updateEmployee(data: any){
    this.employee.next(data);
  }
}
