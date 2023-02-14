import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FormBuilderModule } from './pages/form-builder/form-builder.module'
import { ShareDataService } from './services/share-data.service'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,

        FormBuilderModule,
        BrowserAnimationsModule,
    ],
    providers: [ShareDataService],
    bootstrap: [AppComponent],
})
export class AppModule {}
