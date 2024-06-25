import {
  AfterViewInit,
  Component,
  EmbeddedViewRef,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {NgIf} from "@angular/common";
import {Dir1Directive} from "../dir1.directive";
import {MyNgIfDirective} from "../my-ng-if.directive";
import {MyInputComponent} from "../my-input/my-input.component";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-aa',
  standalone: true,
  imports: [
    NgIf,
    Dir1Directive,
    MyNgIfDirective,
    MyInputComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './aa.component.html',
  styleUrl: './aa.component.css'
})
export class AaComponent implements AfterViewInit, OnInit {
  @ViewChild('dynamicTemplate', {read: TemplateRef, static: false}) dynamicTemplate!: TemplateRef<any>;
  @ViewChild('container', {read: ViewContainerRef, static: false}) container!: ViewContainerRef
  // vcRef = inject(ViewContainerRef);
  isTemplateVisible = false;
  embeddedViewRef?: EmbeddedViewRef<any>;

  @ViewChild(Dir1Directive) dir1!: Dir1Directive;
  isShow = true;

  fb = inject(FormBuilder);
  form = this.fb.group({
    name: this.fb.control('')
  });


  toggleShow() {
    this.isShow = !this.isShow;
  }

  toggleTemplate() {
    this.isTemplateVisible = !this.isTemplateVisible;
  }

  ngAfterViewInit() {
    if (this.container) {
      console.log('container is available in ngAfterViewInit');
    } else {
      console.log('container is not available in ngAfterViewInit');
    }
  }

  ngOnInit(): void {
    if (this.container) {
      console.log('container is available in ngOnInit');
    } else {
      console.log('container is not available in ngOnInit');
    }

  }

  createTemplate() {
    // this.embeddedViewRef = this.container.createEmbeddedView(this.dynamicTemplate);
    // this.embeddedViewRef = this.vcRef.createEmbeddedView(this.dynamicTemplate);
    this.dir1.vcRef.createEmbeddedView(this.dynamicTemplate);
  }

  destroyTemplate() {
    if (this.embeddedViewRef) {
      this.embeddedViewRef.destroy();
    }
  }

  setName() {
    this.form.controls.name.setValue('test666');
  }
}
