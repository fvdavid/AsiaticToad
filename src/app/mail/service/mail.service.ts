import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';

@Injectable()
export class MailService {

  private _mails: BehaviorSubject<any>;
  private apiUrl = environment.mailApi;

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore) {
    this._mails = new BehaviorSubject<any>([]);
  }

  get mails() {
    return this._mails.asObservable();
  }

  getMails() {
    // const url = this.apiUrl;
    // this.http.get(url).subscribe(res => {
    //   console.log('res >> ' + JSON.stringify(res));
    //   this._mails.next(res);
    // });

    this.firestore.collection('documentManagement').valueChanges().subscribe(res => {
      this._mails.next(res);
    });


    // this.firestore.collection('documentManagement').snapshotChanges().map(action => {
    //   const $key = action.payload.key;
    //   const data = { $key, ...action.payload.val() };
    //   return data;
    // })
  }
}
