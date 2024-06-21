import {Directive, inject, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appMyNgIf]',
  standalone: true
})
export class MyNgIfDirective implements OnChanges{
  tRef = inject(TemplateRef);
  vcRef = inject(ViewContainerRef);

  @Input() appMyNgIf?: boolean;
  @Input() appMyNgIfThen?: TemplateRef<any>;
  @Input() appMyNgIfElse?: TemplateRef<any>;

  ngOnChanges(simpleChanges: SimpleChanges): void {
    console.log(this.appMyNgIfThen);
    console.log('ngOnChanges appMyNgIf', this.appMyNgIf);
    if (simpleChanges['appMyNgIf']) {
      this.vcRef.clear();
      if (this.appMyNgIf) {
        if (this.appMyNgIfThen) {
          this.vcRef.createEmbeddedView(this.appMyNgIfThen);
        }else {
          this.vcRef.createEmbeddedView(this.tRef);
        }
      } else if (!this.appMyNgIf) {
        if (this.appMyNgIfElse) {
          this.vcRef.createEmbeddedView(this.appMyNgIfElse);
        }
      }
    }
  }

  constructor() {
  }

}
