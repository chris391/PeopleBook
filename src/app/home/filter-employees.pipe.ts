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

    if (employees.length > 0 && search) {
      let foundItems = employees.filter(
        employee => employee.name && employee.name.toLowerCase().includes(search.toLowerCase())
        || employee.position && employee.position.toLowerCase().includes(search.toLowerCase())
      );
      return foundItems;
    }
    return employees;

  }
}
