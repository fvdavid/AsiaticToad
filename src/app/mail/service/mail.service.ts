import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class MailService {

  private _mails: BehaviorSubject<any>;
  private apiUrl = environment.mailApi;

  constructor(private http: HttpClient) {
    this._mails = new BehaviorSubject<any>([]);
  }

  get mails() {
    return this._mails.asObservable();
  }

  getMails() {
    const url = this.apiUrl;
    this.http.get(url).subscribe(res =>
      this._mails.next(res)  
    );
  }
}
