import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MailModel } from '../model/mail.model';

@Injectable()
export class DocumentsService {

  constructor(private firestore: AngularFirestore) { }

  myArray: any[] = [];

  getAllDocuments() {
    return this.firestore.collection('documentManagement').snapshotChanges();
    // this.firestore.
    //   collection('documentManagement')
    //   .get()
    //   .subscribe((docsManagement) => {
    //     docsManagement.docs.forEach((doc) => {
    //       this.myArray.push(doc.data());
    //     });
    //   });
  }

  saveToFirestore(mailModel: MailModel) {
    this.firestore.collection('documentManagement')
      .add({
        subject: mailModel.subject,
        content: mailModel.content,
        when: mailModel.when,
        read: false,
        starred: false,
        group: mailModel.group,
        attachments: mailModel.attachments,
      })
      .then(res => {
        console.log('log ::saveToFirestore:: --> ' + res);
      })
      .catch(e => {
        console.log('log ::saveToFirestore:: ==> ' + e.message);
      });
  }
}
