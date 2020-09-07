import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DocumentStatusComponent } from '../document-status/document-status.component';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss']
})
export class DocumentDetailComponent implements OnInit {

  @Input() mail;
  showMailDetail;

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];

  colorOne: string;
  colorTwo: string;

  constructor(
    public composeDialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.colorOne = '#FFFFFF';
  }

  ngOnInit() {
  }

  openChangeStatus() {
    const dialogRefStatus = this.composeDialog.open(DocumentStatusComponent, {
      maxWidth: '50vw',
      maxHeight: '50vh',
      height: '50%',
      width: '50%'
    });

    dialogRefStatus.afterClosed().subscribe(result => {
      this.snackBar.open('Change Status has been closed', '', { duration: 4000 });
    });
  }

}
