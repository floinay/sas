import {Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionsListenerService} from './actions-listener.service';
import {ActionsInjector} from './actions-injector';
import {SAS_ACTIONS_PROVIDERS} from './actions.providers';

/**
 * This module enable actions calls listener.
 * You don`t need import this module for use @Action decorator.
 * @Example: You develop plugin that listen actions calls and send to statistics server. You need import SasActionsModule module to root module and after that inject ActionsListenerService and subscribe to listen() method
 */
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
