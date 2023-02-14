import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PreviewGuardGuard } from 'src/app/guards/preview-guard.guard'
import { FormBuilderComponent } from './form-builder.component'
import { PreviewComponent } from './preview/preview.component'

const routes: Routes = [
    {
        path: 'builder',
        component: FormBuilderComponent,
    },
    {
        path: 'preview',
        component: PreviewComponent,
        canActivate: [PreviewGuardGuard]
    },
    {
        path: '',
        redirectTo: 'builder',
        pathMatch: 'full',
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FormBuilderRoutingModule {}
