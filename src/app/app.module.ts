import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FirebaseModule } from './shared/firebase/firebase.module';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { SidenavLayoutComponent } from './layouts/sidenav-layout/sidenav-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    SidenavLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    FirebaseModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
