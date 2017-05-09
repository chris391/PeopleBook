/**
 * Created by marcosuarez on 4/27/17.
 */
import {FormControl} from "@angular/forms";

 export class CustomValidators {
  static validateEmail(form : FormControl){
    let pattern: RegExp = /\S+@\S+\.\S+/;
    return pattern.test(form.value) ? null : {
      validateEmail: {
        valid: false
      }
    }
  }

   static validateUserID(form: FormControl) {
     let pattern: RegExp = /[p]+[0-9]/;
     return pattern.test(form.value) ? null : {
       validateUserID: {
         valid: false
       }
     }
   }
}



 // let pattern:RegExp = /\S+@\S+\.\S+/;
