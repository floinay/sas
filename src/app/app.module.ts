import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SasActionsModule} from '../../projects/sas/src/lib/actions';
import {RouteObserverModule} from '../../projects/sas/src/lib/plugins/route-observer/route-observer.module';
import {SasStoragePluginModule} from 'sas';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SasActionsModule,
    SasStoragePluginModule,
    RouteObserverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
