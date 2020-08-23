import { NgModule } from '@angular/core';

import { QuillModule } from 'ngx-quill';

import { MailRoutingModule } from './mail-routing.module';
import { MailComponent } from './mail/mail.component';
import { ComposeComponent } from './compose/compose.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MailService } from './service/mail.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layouts';
import { BrandModule } from '../layouts/brand/brand.module';
import { SearchComponent } from './search/search.component';
import { ToolbarNotificationComponent } from './toolbar-notification/toolbar-notification.component';
import { DocumentsService } from './service/documents.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    MailComponent,
    ComposeComponent,
    ListComponent,
    DetailComponent,
    ToolbarComponent,
    SearchComponent,
    ToolbarNotificationComponent
  ],
  imports: [
    HttpClientModule,
    MailRoutingModule,
    SharedModule,
    LayoutModule,
    BrandModule,
    QuillModule,
  ],
  providers: [
    DocumentsService,
    {
      provide: 'mailService',
      useClass: MailService
    }
    // MailService
  ],
  entryComponents: [
    ComposeComponent
  ]
})
export class MailModule { }
