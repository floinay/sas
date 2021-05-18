import {Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionsListenerService} from './actions-listener.service';
import {ActionsInjector} from './actions-injector';
import {SAS_ACTIONS_PROVIDERS} from './actions.providers';

@NgModule({
  providers: [
    ActionsListenerService,
    SAS_ACTIONS_PROVIDERS
  ],
  imports: [
    CommonModule
  ]
})
export class SasActionsModule {
  constructor(injector: Injector) {
    ActionsInjector.injector = injector;
  }
}
