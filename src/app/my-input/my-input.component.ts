import {Component, inject, Injector, OnInit, runInInjectionContext} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

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
export class MyInputComponent implements OnInit, ControlValueAccessor {
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

  myInput(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('myInput', target.value);
    this.onChange(target.value);
    // this.ngControl.control?.setValue(value);
  }
}
