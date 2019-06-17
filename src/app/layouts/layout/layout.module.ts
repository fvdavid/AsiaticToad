import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  LayoutComponent,
  LayoutHeaderComponent,
  LayoutSidenavComponent
} from './layout.component';

@NgModule({
  imports: [CommonModule, MatSidenavModule],
  declarations: [
    LayoutComponent,
    LayoutHeaderComponent,
    LayoutSidenavComponent
  ],
  exports: [LayoutComponent, LayoutHeaderComponent, LayoutSidenavComponent]
})
export class LayoutModule { }
