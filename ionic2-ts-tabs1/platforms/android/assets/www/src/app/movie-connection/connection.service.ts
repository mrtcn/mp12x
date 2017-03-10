import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { PopcornManagementService} from '../common_helpers/popcorn-management.service';
import { MovieConnection, ActorMoviePair, ActorInfo, MovieInfo, UserSelections, GameInitialize, ActorMovieConnection, UserSelectionValidationResult, PopcornInfoViewModel } from './connection.model'
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConnectionService {
    private baseUrl = this.config.apiEndpoint + 'Movie';
    
    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
        
    }

    getMovies(body: Object): Observable<MovieConnection[]> {
        var bodyJson = JSON.stringify(body);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + '/GetMovies', bodyJson, options)
            .map((res: Response) => JSON.parse(res.json()));
    }

    getActors(body: Object): Observable<MovieConnection[]> {
        var bodyJson = JSON.stringify(body);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });        
        return this.http.post(this.baseUrl + '/GetActors', bodyJson, options)
            .map((res: Response) => JSON.parse(res.json()));
    }

    getGameInit(): Observable<GameInitialize> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + '/GetConnectionPaths', '{}', options)
            .map((res: Response) => JSON.parse(res.json()));
    }

    getPopcornPoint(): Observable<PopcornInfoViewModel> {
        let localToken = localStorage.getItem("token");

        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization", "Bearer " + localToken);
        var options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + '/GetPopcornPoints', '{}', options)
            .map((res: Response) => JSON.parse(res.json()));
    }

    addPopcornPoint(popcornType: Number): Observable<PopcornInfoViewModel> {
        let localToken = localStorage.getItem("token");

        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization", "Bearer " + localToken);
        var options = new RequestOptions({ headers: headers });

        let popcornToAdd = popcornType === 1 ? this.config.rightAnswerPoint
            : popcornType === 2 ? this.config.wrongAnswerPoint
                : popcornType === 3 ? this.config.winPoint : popcornType;

        let body = new PopcornInfoViewModel(popcornToAdd, null);

        return this.http.post(this.baseUrl + '/AddPopcornPoints', JSON.stringify(body), options)
            .map((res: Response) => JSON.parse(res.json()));
    }

    setLocalStorageOnInit(result: GameInitialize): UserSelections {
        localStorage.setItem("gameInitJson", JSON.stringify(result));

        let gameInitialize: GameInitialize = result;
        let userSelections: UserSelections = new UserSelections();
        userSelections.ActorMoviePairs = new Array<ActorMoviePair>();

        let actorMoviePair = new ActorMoviePair();
        actorMoviePair.ActorInfo = new ActorInfo();
        actorMoviePair.MovieInfo = new MovieInfo();

        actorMoviePair.ActorInfo.ActorId = gameInitialize.BaseActorId;
        actorMoviePair.ActorInfo.ActorName = gameInitialize.BaseActorName;
        userSelections.ActorMoviePairs.push(actorMoviePair);
        
        localStorage.setItem("gameUserSelections", JSON.stringify(userSelections));

        return userSelections;
    }

    checkConnection(id: number, title: string, gameState: number): Observable<UserSelectionValidationResult> {
        var userSelectionValidationResult = new UserSelectionValidationResult();

        let connectionJson = localStorage.getItem("gameInitJson");

        let connections: GameInitialize = JSON.parse(connectionJson);
        let userSelectionJson = localStorage.getItem("gameUserSelections");

        let userSelections: UserSelections = JSON.parse(userSelectionJson);

        
        let isRightSelection: number = 2;
        if (gameState === 1) {
            isRightSelection = this.checkActorConnections(userSelections, id, title, connections);
        } else {
            isRightSelection = this.checkMovieConnections(userSelections, id, title, connections);            
        }

        this.addPopcornPoint(isRightSelection);

        if (isRightSelection === 1 || isRightSelection === 3) {
            userSelectionValidationResult.UserSelections = userSelections;
            userSelectionValidationResult.IsRightSelection = isRightSelection;

            localStorage.removeItem("gameUserSelections");
            localStorage.setItem("gameUserSelections", JSON.stringify(userSelectionValidationResult.UserSelections));

            if (isRightSelection === 1) {
                
            }

            return Observable.of(userSelectionValidationResult);
        } else {
            let userSelectionJson = localStorage.getItem("gameUserSelections");
            userSelectionValidationResult.UserSelections = JSON.parse(userSelectionJson);
            userSelectionValidationResult.IsRightSelection = isRightSelection;
            return Observable.of(userSelectionValidationResult);
        }        
    }

    checkActorConnections(userSelections: UserSelections, id: number, title: string, connections: GameInitialize) {
        let isRightSelection: number = 2;
        userSelections.ActorMoviePairs.push({ ActorInfo: { ActorId: id, ActorName: title }, MovieInfo: { MovieId: null, MovieName: null } });

        var selectionCount = userSelections.ActorMoviePairs.length;
        var connectionCount = connections.ActorMovieConnections.length;

        for (let outerIndex: number = 0; outerIndex < connectionCount; outerIndex++) {

            for (let innerIndex: number = 0; innerIndex < selectionCount; innerIndex++) {
                let selectedActorId = userSelections.ActorMoviePairs[innerIndex].ActorInfo.ActorId;
                let rightActorId = connections.ActorMovieConnections[outerIndex].ActorMovieInfo[innerIndex].ActorInfo.ActorId;
                if (selectedActorId === rightActorId) {
                    if (selectedActorId === connections.DestinationActorId) {
                        isRightSelection = 3;
                    } else {
                        isRightSelection = 1;
                    }

                } else {
                    isRightSelection = 2;
                    break;
                }

                if (innerIndex + 1 !== selectionCount) {
                    let selectedMovieId = userSelections.ActorMoviePairs[innerIndex].MovieInfo.MovieId;
                    let rightMovieId = connections.ActorMovieConnections[outerIndex].ActorMovieInfo[innerIndex].MovieInfo.MovieId;
                    if (selectedMovieId === rightMovieId) {
                        if (selectedActorId === connections.DestinationActorId) {
                            isRightSelection = 3;
                        } else {
                            isRightSelection = 1;
                        }
                    } else {
                        isRightSelection = 2;
                        break;
                    }
                }
            }
            if (isRightSelection === 1 || isRightSelection === 3) {
                break;
            }
        }
        return isRightSelection;
    }

    checkMovieConnections(userSelections: UserSelections, id: number, title: string, connections: GameInitialize) {
        let isRightSelection: number = 2;
        var selectionCount = userSelections.ActorMoviePairs.length;
        var connectionCount = connections.ActorMovieConnections.length;

        userSelections.ActorMoviePairs.splice((selectionCount - 1), 1, {
            ActorInfo: { ActorId: userSelections.ActorMoviePairs[selectionCount - 1].ActorInfo.ActorId, ActorName: userSelections.ActorMoviePairs[selectionCount - 1].ActorInfo.ActorName }
            , MovieInfo: { MovieId: id, MovieName: title }
        });

        for (let outerIndex: number = 0; outerIndex < connectionCount; outerIndex++) {

            for (let innerIndex: number = 0; innerIndex < selectionCount; innerIndex++) {
                let selectedActorId = userSelections.ActorMoviePairs[innerIndex].ActorInfo.ActorId;
                let rightActorId = connections.ActorMovieConnections[outerIndex].ActorMovieInfo[innerIndex].ActorInfo.ActorId;
                if (selectedActorId === rightActorId) {
                    if (selectedActorId === connections.DestinationActorId) {
                        isRightSelection = 3;
                    } else {
                        isRightSelection = 1;
                    }
                } else {
                    isRightSelection = 2;
                    break;
                }

                let selectedMovieId = userSelections.ActorMoviePairs[innerIndex].MovieInfo.MovieId;
                let rightMovieId = connections.ActorMovieConnections[outerIndex].ActorMovieInfo[innerIndex].MovieInfo.MovieId;
                if (selectedMovieId === rightMovieId) {
                    if (selectedActorId === connections.DestinationActorId) {
                        isRightSelection = 3;
                    } else {
                        isRightSelection = 1;
                    }
                } else {
                    isRightSelection = 2;
                    break;
                }
            }
            if (isRightSelection === 1 || isRightSelection === 3) {
                break;
            }
        }
        return isRightSelection;
    }
}