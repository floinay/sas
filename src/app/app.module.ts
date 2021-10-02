import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SasActionsModule} from '../../projects/sas/src/lib/actions';
import {RouteObserverModule} from '../../projects/sas/src/lib/plugins/route-observer/route-observer.module';
import {SasStoragePluginModule} from '../../projects/sas/src/lib/plugins/storage/sas-storage-plugin.module';
import {RouterModule} from '@angular/router';
import {RouteComponentComponent} from './route-component/route-component.component';

@NgModule({
  declarations: [
    AppComponent,
    RouteComponentComponent
  ],
  imports: [
    BrowserModule,
    SasActionsModule,
    SasStoragePluginModule,
    RouterModule.forRoot([
      {
        path: 'test/:slug',
        component: RouteComponentComponent
      }]),

    RouteObserverModule,],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
