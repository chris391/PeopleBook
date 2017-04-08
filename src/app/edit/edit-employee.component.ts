import {Component, Input} from "@angular/core";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: "edit-employee",
  styleUrls: ["edit-employee.component.css"],
  template:`
  <tbody>
        <tr>
          <td colspan="4">
            <form class="form-inline" #form="ngForm" (ngSubmit)="editCat(cat)" style="display:inline">
              <div class="form-group">
              
                  <input class="form-control" type="text" name="name" ngModel={{editEmployeeTarget.name}} placeholder="Name" required> 
              </div>
              <div class="form-group">
                  <input class="form-control" type="text" name="position" ngModel={{editEmployeeTarget.position}} placeholder="Position" required>
              </div>
              <div class="form-group">
                  <input class="form-control" type="text" name="department" ngModel={{editEmployeeTarget.department}} placeholder="Department" required>
              </div>
              <div class="form-group">
                  <input class="form-control" type="text" name="superior" ngModel={{editEmployeeTarget.superiorName}} placeholder="Superior" required>
              </div>
              <div class="form-group">
                  <input class="form-control" type="text" name="subordinate" ngModel={{editEmployeeTarget.subordinateName}} placeholder="Subordinate" required>
              </div>
              
              <button class="btn btn-sm btn-primary" type="submit" [disabled]="!form.form.valid"><i class="fa fa-floppy-o"></i> Save</button>
            </form>
            <button class="btn btn-sm btn-warning" (click)="cancelEditing()"><i class="fa fa-times"></i> Cancel </button>
          </td>
        </tr>
      </tbody>
`
})
export class EditEmployeeComponent{

  @Input() editEmployeeTarget;
  employee = {};
  constructor(private homeComponent: HomeComponent){}

  cancelEditing(){
    this.homeComponent.cancelEditing();
  }

}
