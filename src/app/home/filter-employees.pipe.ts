/**
 * Created by Cristian on 27/04/2017.
 */
import { Pipe, Injectable, PipeTransform } from '@angular/core'

@Pipe({
  name: 'filterEmployees'
})
@Injectable()
export class FilterEmployees implements PipeTransform {
  transform(employees: any[], search: string) {

    if (search && employees.length > 0) {
      let foundItems = employees.filter(
        employee => employee.name && employee.name.toLowerCase().includes(search.toLowerCase())
      );
      return foundItems;
    }
    return employees;

  }
}
