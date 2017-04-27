import {Injectable} from "@angular/core";
import {Subject, BehaviorSubject} from "rxjs";
/**
 * Created by Cristian on 27/04/2017.
 */
@Injectable()
export class NodeService {
  private searchInput = new Subject();

  getData() {
    return this.searchInput;
  }

  updateData(data: string) {
    this.searchInput.next(data);
  }
}
