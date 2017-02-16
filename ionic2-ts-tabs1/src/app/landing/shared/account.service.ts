import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RegisterViewModel, LoginViewModel } from './account.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AccountService {
    //private baseUrl = 'http://api.movieconnections.huretsucuklari.com/api/Account';
    private baseUrl = 'http://localhost:52368/api/Account';

    constructor(private http: Http) { }

    public register(model: RegisterViewModel): Observable<boolean> {
        let registerJson = JSON.stringify(model);
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + '/Register', registerJson, options).map((res: Response) => JSON.parse(res.json()));
    }

    public login(model: LoginViewModel): Observable<boolean> {
        let loginJson = JSON.stringify(model);
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + '/Login', loginJson, options).map((res: Response) => JSON.parse(res.json()));
    }
}