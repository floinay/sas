import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SasActionsModule} from '../../projects/sas/src/lib/actions/sas-actions.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SasActionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
