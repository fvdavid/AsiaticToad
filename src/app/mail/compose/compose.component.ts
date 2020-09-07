import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, takeUntil } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MailService } from '../service/mail.service';
import { StorageService } from '../service/storage.service';
import { MatDialogRef } from '@angular/material';
import { FileUpload } from '../model/fileupload.model';

interface DocumentDivisi {
  value: string;
  viewValue: string;
}

interface DocumentStatus {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit, OnDestroy {

  divisis: DocumentDivisi[] = [
    { value: 'HRD', viewValue: 'HRD' },
    { value: 'KEUANGAN', viewValue: 'KEUANGAN' },
    { value: 'TEKNOLOGI', viewValue: 'TEKNOLOGI' }
  ];

  statuss: DocumentStatus[] = [
    { value: 'TO DO', viewValue: 'TO DO' },
    { value: 'ON PROGRESS', viewValue: 'ON PROGRESS' },
    { value: 'DONE', viewValue: 'DONE' }
  ];

  currentFileUpload: FileUpload;

  destroy$: Subject<null> = new Subject();
  fileToUpload: File;
  kittyImagePreview: string | ArrayBuffer;
  pictureForm: FormGroup;
  submitted = false;
  uploadProgress$: Observable<number>;
  user: firebase.User;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly storageService: StorageService,
    private dialogRef: MatDialogRef<ComposeComponent>,
  ) { }

  ngOnInit(): void {
    this.pictureForm = this.formBuilder.group({
      photo: [null, [Validators.required, this.image.bind(this)]],
      description: [null, Validators.required],
      subject: [null, Validators.required],
      divisi: [null, Validators.required],
      status: [null, Validators.required],
    });

    this.pictureForm
      .get('photo')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((newValue) => {
        this.handleFileChange(newValue.files);
      });
  }

  handleFileChange([kittyImage]) {
    this.fileToUpload = kittyImage;
    const reader = new FileReader();
    // reader.onload = (loadEvent) => (this.kittyImagePreview = loadEvent.target.result);
    reader.readAsDataURL(kittyImage);
  }

  submitDeskripsi() {
    // console.log('pictureForm >> ' + JSON.stringify(this.pictureForm.value)); // all data

    this.submitted = true;
    const mediaFolderPath = '/user/media';

    this.currentFileUpload = new FileUpload(this.fileToUpload);

    const { downloadUrl$, uploadProgress$ } = this.storageService.uploadFileAndGetMetadata(
      mediaFolderPath,
      this.currentFileUpload,
      this.pictureForm.value
    );

    this.uploadProgress$ = uploadProgress$;

    downloadUrl$
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.snackBar.open(`${error.message} 😢`, 'Close', {
            duration: 4000,
          });
          return EMPTY;
        }),
      )
      .subscribe((downloadUrl) => {
        this.submitted = false;
        this.dialogRef.close(this.pictureForm.value);
      });
  }

  // postKitty() {
  //   this.submitted = true;
  //   const mediaFolderPath = '/user/media';

  //   const { downloadUrl$, uploadProgress$ } = this.storageService.uploadFileAndGetMetadata(
  //     mediaFolderPath,
  //     this.fileToUpload,
  //   );

  //   this.uploadProgress$ = uploadProgress$;

  //   downloadUrl$
  //     .pipe(
  //       takeUntil(this.destroy$),
  //       catchError((error) => {
  //         this.snackBar.open(`${error.message} 😢`, 'Close', {
  //           duration: 4000,
  //         });
  //         return EMPTY;
  //       }),
  //     )
  //     .subscribe((downloadUrl) => {
  //       this.submitted = false;
  //       this.router.navigate(['/mail']);
  //     });
  // }

  ngOnDestroy() {
    this.destroy$.next(null);
  }

  private image(photoControl: AbstractControl): { [key: string]: boolean } | null {
    if (photoControl.value) {
      const [kittyImage] = photoControl.value.files;
      return this.storageService.validateFile(kittyImage)
        ? null
        : {
          image: true,
        };
    }
    return;
  }

}
