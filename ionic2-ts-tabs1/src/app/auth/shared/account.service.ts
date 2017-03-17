import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RegisterApiModel, LoginViewModel, AccessTokenModel, UserInfo } from './account.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AccountService {
    private baseUrl = this.config.baseEndpoint;

    constructor( @Inject(APP_CONFIG) private config: IAppConfig, private http: Http) { }

    public isAuthenticated(): Observable<boolean> {
        //Get Token From LocalStorage
        let localToken = localStorage.getItem("token");

        let headers = new Headers();
        headers.append("Authorization", "Bearer " + localToken);

        let options = new RequestOptions({ headers: headers });
        
        return this.http.get(this.baseUrl + '/api/Account/UserInfo', options).map((res: Response) => {
            return null != res.json();
        });
    }

    public getUserInfo(): Observable<UserInfo> {
        //Get Token From LocalStorage
        let localToken = localStorage.getItem("token");

        let headers = new Headers();
        headers.append("Authorization", "Bearer " + localToken);

        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.baseUrl + '/api/Account/UserInfo', options).map((res: Response) => res.json());
    }

    public updateUser(model: UserInfo): Observable<boolean> {
        //Get Token From LocalStorage
        let localToken = localStorage.getItem("token");

        let updateJson = JSON.stringify(model);
        let headers = new Headers({ "Content-Type": "application/json" });
        headers.append("Authorization", "Bearer " + localToken);
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + '/api/Account/UpdateUserInfo', updateJson, options).map((res: Response) => JSON.parse(res.json()));
    }

    public register(model: RegisterApiModel): Observable<boolean> {
        let registerJson = JSON.stringify(model);
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + '/api/Account/Register', registerJson, options).map((res: Response) => JSON.parse(res.json()));
    }

    public login(model: LoginViewModel): Observable<boolean> {
        let urlSearchParams = new URLSearchParams();        
        urlSearchParams.append('username', model.userName);
        urlSearchParams.append('password', model.password);
        urlSearchParams.append('grant_type', 'password');

        let body = urlSearchParams.toString();
        let headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + '/Token', body, options).map((res: Response) => {
            localStorage.setItem("token", res.json().access_token);
            return res.json().access_token != null;
        });
    }
}