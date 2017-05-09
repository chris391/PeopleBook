/**
 * Created by marcosuarez on 5/9/17.
 */
import {Injectable, Pipe, PipeTransform} from "@angular/core";
@Pipe({
name: 'capitalized'
})
@Injectable()
export class Capitalized implements PipeTransform{
  transform(value: string): any {
    if (!value) return value;

    // return value.replace(/\w\S*/g, function(txt) {
    var reg = /\w\S*/g;
    return value.replace(reg, function(txt) {
      return txt.charAt(0).substr(0).toUpperCase() ;
    });
  }
}
