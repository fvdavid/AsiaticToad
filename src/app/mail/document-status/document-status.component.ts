import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-document-status',
  templateUrl: './document-status.component.html',
  styleUrls: ['./document-status.component.scss']
})
export class DocumentStatusComponent implements OnInit {

  statuss = [
    { value: 'TO DO', viewValue: 'TO DO' },
    { value: 'ON PROGRESS', viewValue: 'ON PROGRESS' },
    { value: 'DONE', viewValue: 'DONE' }
  ];

  pictureForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DocumentStatusComponent>) { }

  ngOnInit() {
    this.pictureForm = this.formBuilder.group({
      status: [null, Validators.required],
    });
  }

  submitChangeStatus() {
    this.dialogRef.close(this.pictureForm.value.status);
  }

}
