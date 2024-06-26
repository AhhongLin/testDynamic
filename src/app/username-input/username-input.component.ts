import {Component, inject, Injector, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ControlValueAccessor,
  NG_ASYNC_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors
} from "@angular/forms";
import {map, Observable} from "rxjs";
import {UsernameService} from "../username.service";

@Component({
  selector: 'app-username-input',
  standalone: true,
  imports: [],
  templateUrl: './username-input.component.html',
  styleUrl: './username-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UsernameInputComponent,
      multi: true
    },
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UsernameInputComponent,
      multi: true
    }
  ]
})
export class UsernameInputComponent implements OnInit, ControlValueAccessor, AsyncValidator {

  value: string = '';

  disabled: boolean = false;
  onChange: any;
  onTouched: any;

  injector = inject(Injector);
  ngControl!: NgControl;
  private usernameService = inject(UsernameService);

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
    console.log('ngControl', this.ngControl);
  }


  //region ControlValueAccessor
  writeValue(obj: string): void {
    console.log('writeValue', obj);
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    console.log('registerOnChange', fn);
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    console.log('registerOnTouched', fn);
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    console.log('setDisabledState', isDisabled)
    this.disabled = isDisabled;
  }

  //endregion

  setValue() {
    this.onChange('this.value');
  }

  myInput(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('myInput', target.value);
    this.onChange(target.value);
    // this.ngControl.control?.setValue(value);
  }

  //region Validator
  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    console.log('UsernameValidatorDirective.validate', control.value)
    return this.usernameService.checkUsername(control.value).pipe(
      map(isTaken => (isTaken ? { usernameTaken: true } : null))
    );
  }

  registerOnValidatorChange?(fn: () => void): void {

  }

  //endregion

}
