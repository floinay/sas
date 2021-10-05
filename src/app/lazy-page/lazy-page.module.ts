import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyPageRoutingModule } from './lazy-page-routing.module';
import { LazyPageComponent } from './lazy-page.component';


@NgModule({
  declarations: [
    LazyPageComponent
  ],
  imports: [
    CommonModule,
    LazyPageRoutingModule
  ]
})
export class LazyPageModule { }
