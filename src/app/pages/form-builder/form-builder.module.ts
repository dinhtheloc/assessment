import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ModalModule } from 'ngx-bootstrap/modal'
import { FormBuilderRoutingModule } from './form-builder-routing.module'
import { FormBuilderComponent } from './form-builder.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
    declarations: [FormBuilderComponent, DynamicFormComponent, PreviewComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormBuilderRoutingModule,
        ModalModule.forRoot()
    ],
    exports: [DynamicFormComponent],
})
export class FormBuilderModule {}
