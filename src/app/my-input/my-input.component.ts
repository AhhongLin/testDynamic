import {Component, inject, Injector, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  Validator
} from "@angular/forms";

@Component({
  selector: 'app-my-input',

  standalone: true,
  imports: [],
  templateUrl: './my-input.component.html',
  styleUrl: './my-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MyInputComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: MyInputComponent,
      multi: true
    }
  ]
})
export class MyInputComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {
  @Input() validParam?: string;

  value: string = '';

  disabled: boolean = false;
  onChange: any;
  onTouched: any;

  injector = inject(Injector);
  ngControl!: NgControl;

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
    console.log('ngControl', this.ngControl);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['validParam'].isFirstChange()) {
      this.onValidatorChange();
    }
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
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    console.log('validate', control.value, this.validParam)
    if (this.validParam) {
      console.log('validParam', this.validParam, typeof this.validParam, typeof control.value);

      if (control.value === this.validParam) {
        console.log('error');
        return {error: 'error'};
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  onValidatorChange: any;
  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  //endregion

}
