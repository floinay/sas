import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SasActionsModule} from '../../projects/sas/src/lib/actions';
import {SasStoragePluginModule} from '../../projects/sas/src/lib/plugins/storage/sas-storage-plugin.module';
import {RouteObserverModule} from '../../projects/sas/src/lib/plugins/route-observer/route-observer.module';

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
