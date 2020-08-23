import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MailModel } from '../model/mail.model';
import { formatDate } from '@angular/common';
import { DocumentsService } from '../service/documents.service';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {

  foods: DocumentDivisi[] = [
    { value: 'HRD', viewValue: 'HRD' },
    { value: 'KEUANGAN', viewValue: 'KEUANGAN' },
    { value: 'TEKNOLOGI', viewValue: 'TEKNOLOGI' }
  ];

  mail;
  subject: string;
  content: string;
  group: string;

  mailModel: MailModel;

  constructor(
    private dialogRef: MatDialogRef<ComposeComponent>,
    private docService: DocumentsService) { }

  ngOnInit() { }

  saveNewDocument() {
    this.mailModel = {
      subject: this.subject,
      content: this.content,
      read: false,
      group: this.group,
      when: new Date(),
      starred: false,
      attachments: '',
    };

    this.docService.saveToFirestore(this.mailModel);

    // console.log(this.mail, this.name, this.subject);
    // const fvDate = formatDate(new Date(), 'yyyy-MMMM-dd', 'en-US');

    // console.log('subject ===> ' + this.mailModel.subject);
    // console.log('group ===> ' + this.mailModel.group);
    // console.log('content ===> ' + this.mailModel.content);
    // console.log('content ===> ' + this.mailModel.when);
    // console.log('-------------------------------------------');

    this.dialogRef.close(this.mailModel);
  }

}

interface DocumentDivisi {
  value: string;
  viewValue: string;
}
