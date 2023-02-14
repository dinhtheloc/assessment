import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: 'form',
        loadChildren: () =>
            import('./pages/form-builder/form-builder.module').then(
                (m) => m.FormBuilderModule
            ),
    },
    {
        path: '',
        redirectTo: 'form',
        pathMatch: 'full',
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
