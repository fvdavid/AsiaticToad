import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

import { from, Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { switchMap, finalize } from 'rxjs/operators';
import { FileUpload, FileUplodSaved } from '../model/fileupload.model';

export interface FilesUploadMetadata {
  uploadProgress$: Observable<number>;
  downloadUrl$: string;
}


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private mediaFilePath = '/mediaFiles';
  fileSaved: FileUplodSaved = new FileUplodSaved();

  constructor(
    private readonly storage: AngularFireStorage,
    private readonly db: AngularFireDatabase,
    private readonly firestore: AngularFirestore) { }

  private imageOrVideoFileTypes = [
    'application/ogg',
    'application/vnd.apple.mpegurl',
    'application/x-mpegURL',
    'image/apng',
    'image/bmp',
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
    'image/x-icon',
    'application/pdf',
  ];

  validateFile(file: File): boolean {
    return this.imageOrVideoFileTypes.includes(file.type);
  }

  uploadFileAndGetMetadata(mediaFolderPath: string, fileUpload: FileUpload, pictureForm: any): FilesUploadMetadata {
    const filePath = `${mediaFolderPath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    this.fileSaved = {
      description: pictureForm.description,
      subject: pictureForm.subject,
      divisi: pictureForm.divisi,
      // status: pictureForm.status,
      when: new Date(),
      starred: false,
      read: false,
    };

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          // this.saveFileData(fileUpload, this.fileSaved);

          this.saveFileDataToStorage(fileUpload, this.fileSaved);
        });
      })
    ).subscribe();

    return {
      uploadProgress$: uploadTask.percentageChanges(),
      downloadUrl$: fileUpload.url,
    };
  }

  private saveFileDataToStorage(fileUpload: FileUpload, fileDocument: FileUplodSaved) {
    const data: any = {
      name: fileUpload.name,
      url: fileUpload.url,
      description: fileDocument.description,
      subject: fileDocument.subject,
      divisi: fileDocument.divisi,
      when: Date.now(),
      starred: false,
      read: false,
    };

    this.firestore.collection('documentManagement')
      .add(data)
      .then(res => {
        console.log('log ::saveToFirestore:: --> ' + res);
      })
      .catch(e => {
        console.log('log ::saveToFirestore:: ==> ' + e.message);
      });
  }

  // private saveFileData(fileUpload: FileUpload, fileDocument: FileUplodSaved) {
  //   let data: any = {
  //     name: fileUpload.name,
  //     url: fileUpload.url,
  //     description: fileDocument.description,
  //     subject: fileDocument.subject,
  //     divisi: fileDocument.divisi,
  //     when: Date.now(),
  //     starred: false,
  //     read: false,
  //   };

  //   this.db.list(this.mediaFilePath).push(data);
  // }

  // getFileUploads(numberItems): AngularFireList<FileUpload> {
  //   return this.db.list(this.mediaFilePath, ref =>
  //     ref.limitToLast(numberItems));
  // }

  // deleteFileUpload(fileUpload: FileUpload) {
  //   this.deleteFileDatabase(fileUpload.key)
  //     .then(() => {
  //       this.deleteFileStorage(fileUpload.name);
  //     })
  //     .catch(error => console.log(error));
  // }

  // private deleteFileDatabase(key: string) {
  //   return this.db.list(this.mediaFilePath).remove(key);
  // }

  // private deleteFileStorage(name: string) {
  //   const storageRef = this.storage.ref(this.mediaFilePath);
  //   storageRef.child(name).delete();
  // }
}
