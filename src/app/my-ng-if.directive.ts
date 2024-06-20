import {Directive, inject, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appMyNgIf]',
  standalone: true
})
export class MyNgIfDirective {
  tRef = inject(TemplateRef);
  vcRef = inject(ViewContainerRef);

  @Input() set appMyNgIf(condition: boolean) {
    if (condition) {
      this.vcRef.createEmbeddedView(this.tRef);
    } else {
      this.vcRef.clear();
    }
  }

  constructor() {
  }

}
