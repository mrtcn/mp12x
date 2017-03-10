import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { PopcornInfoViewModel } from '../movie-connection/connection.model'
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PopcornManagementService {
    private baseUrl = this.config.apiEndpoint;

    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {

    }

    addPopcornPointToTempPoints(popcornPoints: number): PopcornInfoViewModel {
        let tempPopcornPoints: number = Number(localStorage.getItem("tempPopcornPoints"));
        localStorage.setItem("tempPopcornPoints", (tempPopcornPoints + popcornPoints).toString());
        
        tempPopcornPoints = Number(localStorage.getItem("tempPopcornPoints"));
        let level: number = Number(localStorage.getItem("level"));
        var model = new PopcornInfoViewModel(tempPopcornPoints, level);

        return model;
    }

    addPopcornPointToTotalPoints(popcornPoints: number, isPersistent: boolean): Observable<PopcornInfoViewModel> {
        let totalPopcornPoints: number = Number(localStorage.getItem("totalPopcornPoints"));
        totalPopcornPoints += popcornPoints;
        localStorage.setItem("totalPopcornPoints", (totalPopcornPoints).toString());

        let level: number = Number(localStorage.getItem("level"));
        var model = new PopcornInfoViewModel(totalPopcornPoints, level);

        if (!isPersistent) {
            return Observable.of(model);
        }
        
        var bodyJson = JSON.stringify(model);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + 'Account/AddPopcorn', bodyJson, options)
            .map((res: Response) => JSON.parse(res.json()));
    }
}