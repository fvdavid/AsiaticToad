import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {

  mail;
  name: string;
  address: string = 'fv@saddam.com';
  subject: string;
  content: string;

  constructor(private dialogRef: MatDialogRef<ComposeComponent>) { }

  ngOnInit() {
  }

  send() {
    this.mail = {
      from: {
        name: this.mail,
        mail: this.address
      },
      subject: this.subject,
      content: this.content
    };

    console.log(this.mail, this.name, this.subject);
    this.dialogRef.close(this.mail);
  }

}
