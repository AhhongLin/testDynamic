import {Directive, inject, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appDir1]',
  standalone: true
})
export class Dir1Directive {

  vcRef = inject(ViewContainerRef);

  constructor() { }

}
