import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionsListenerService} from './actions-listener.service';

@NgModule({
  providers: [
    ActionsListenerService
  ],
  imports: [
    CommonModule
  ]
})
export class SasActionsModule {
}
