import {Directive, inject, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appMyNgIf]',
  standalone: true
})
export class MyNgIfDirective implements OnChanges {
  @Input() appMyNgIf?: boolean;

  tRef = inject(TemplateRef);
  vcRef = inject(ViewContainerRef);

  constructor() {
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    console.log('ngOnChanges appMyNgIf', this.appMyNgIf);
    if (simpleChanges['appMyNgIf']) {
      if (this.appMyNgIf) {
        this.vcRef.createEmbeddedView(this.tRef);
      } else if (!this.appMyNgIf) {
        this.vcRef.clear();
      }
    }
  }

}
