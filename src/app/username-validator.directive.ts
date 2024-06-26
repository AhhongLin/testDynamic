import {Directive, inject} from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from "@angular/forms";
import {map, Observable} from 'rxjs';
import {UsernameService} from "./username.service";

@Directive({
  selector: '[appUsernameValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UsernameValidatorDirective,
      multi: true
    }
  ],
})
export class UsernameValidatorDirective implements AsyncValidator {

  usernameService = inject(UsernameService);

  constructor() {
  }

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    console.log('UsernameValidatorDirective.validate', control.value)
    return this.usernameService.checkUsername(control.value).pipe(
      map(isTaken => (isTaken ? { usernameTaken: true } : null))
    );
  }

  registerOnValidatorChange?(fn: () => void): void {

  }

}
