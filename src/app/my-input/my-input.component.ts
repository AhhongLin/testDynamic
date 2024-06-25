import {Component} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

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
    }
  ]
})
export class MyInputComponent implements ControlValueAccessor {
  value: string = '';
  disabled: boolean = false;
  onChange: any;
  onTouched: any;

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

  setValue() {
    this.onChange('this.value');
  }
}
