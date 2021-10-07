import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SasActionsModule} from '../../projects/sas/src/lib/actions';
import {RouteObserverModule} from '../../projects/sas/src/lib/plugins/route-observer/route-observer.module';
import {SasStoragePluginModule} from '../../projects/sas/src/lib/plugins/storage/sas-storage-plugin.module';
import {RouterModule} from '@angular/router';
import {RouteComponentComponent} from './route-component/route-component.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RouteComponentComponent
  ],
  imports: [
    BrowserModule,
    SasActionsModule,
    SasStoragePluginModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'test/:slug',
        component: RouteComponentComponent
      },
      {
        path: 'lazy',
        loadChildren: () => import('./lazy-page/lazy-page.module').then(m => m.LazyPageModule)
      }
    ]),

    RouteObserverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
