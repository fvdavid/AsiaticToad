import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  BaseLayoutComponent,
  BaseLayoutHeaderComponent,
  BaseLayoutToolbarComponent,
  BaseLayoutContentComponent
} from './base-layout.component';

@NgModule({
  declarations: [
    BaseLayoutComponent,
    BaseLayoutHeaderComponent,
    BaseLayoutToolbarComponent,
    BaseLayoutContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BaseLayoutModule { }
