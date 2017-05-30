import {Injectable} from "@angular/core";
import {Subject, BehaviorSubject} from "rxjs";
/**
 * Created by Cristian on 27/04/2017.
 */
@Injectable()
export class SharedService {
  private search = new Subject();


  getSearchData() {
    return this.search;
  }

  updateSearchData(data: string) {
    this.search.next(data);
  }
}
