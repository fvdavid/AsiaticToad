import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ComposeComponent } from '../compose/compose.component';
import { MailService } from '../service/mail.service';

import { Observable } from 'rxjs';
import { DocumentsService } from '../service/documents.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {

  allMails;
  shownMails: any[] = [];
  shownMailDetail;

  shownDocts: any[] = [];
  lines: number;

  constructor(
    public composeDialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject('mailService') private service,
    private docsService: DocumentsService) {
    // private service: MailService) {

    // this.lines = this.shownMails.length;
    // console.log('line ==> ' + this.lines);
    this.docsService.getAllDocuments().subscribe(datas => {
      this.lines = datas.length;
    });
  }

  ngOnInit() {
    this.getMails();
  }

  getMails() {
    this.service.getMails();
    this.shownMails = this.service.mails;
    // console.log('shownMails >> ' + JSON.stringify(this.shownMails));
  }

  getDocuments() {
    this.docsService.getAllDocuments();
  }

  openMailDetial(mail) {
    this.shownMailDetail = mail;
  }

  onForward(status) {
    this.shownMailDetail = null;
  }

  openComposeDialog() {
    const dialogRef = this.composeDialog.open(ComposeComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      height: '80%',
      width: '80%',
    });
    dialogRef.afterClosed().subscribe(result => {

      console.log('result >> ' + result);

      this.snackBar.open('Dokument baru batal di buat', '', { duration: 3000 });
    });
  }
}
