import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ComposeComponent } from '../compose/compose.component';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {

  allMails;
  shownMails: any[] = [];
  shownMailDetail;

  lines: number;

  constructor(
    public composeDialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject('mailService') private service) {

    this.lines = this.shownMails.length;
  }

  ngOnInit() {
    this.getMails();
  }

  getMails() {
    this.service.getMails();
    this.shownMails = this.service.mails;
  }

  openMailDetial(mail) {
    this.shownMailDetail = mail;
  }

  onForward(status) {
    this.shownMailDetail = null;
  }

  openComposeDialog() {
    const dialogRef = this.composeDialog.open(ComposeComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      this.snackBar.open('Message has been sent', '', { duration: 3000 });
    });
  }
}
