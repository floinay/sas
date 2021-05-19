import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SasActionsModule} from '../../projects/sas/src/lib/actions';
import {SasStoragePluginModule} from '../../projects/sas/src/lib/plugins/storage/sas-storage-plugin.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SasActionsModule,
    SasStoragePluginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
