import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { MovieConnection, ActorMoviePair, ActorInfo, MovieInfo, UserSelections, GameInitialize, ActorMovieConnection, UserSelectionValidationResult } from './connection.model'
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConnectionService {
    private baseUrl = 'http://api.movieconnections.huretsucuklari.com/api/Movie';
    //private baseUrl = 'http://localhost:52368/api/Movie';
    
    constructor(private http: Http) {}

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
            userSelections.ActorMoviePairs.push({ActorInfo: {ActorId: id, ActorName: title}, MovieInfo:{MovieId: null, MovieName: null}});

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

        } else {

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
        }
        if (isRightSelection === 1 || isRightSelection === 3) {
            userSelectionValidationResult.UserSelections = userSelections;
            userSelectionValidationResult.IsRightSelection = isRightSelection;

            localStorage.removeItem("gameUserSelections");
            localStorage.setItem("gameUserSelections", JSON.stringify(userSelectionValidationResult.UserSelections));

            return Observable.of(userSelectionValidationResult);
        } else {
            let userSelectionJson = localStorage.getItem("gameUserSelections");
            userSelectionValidationResult.UserSelections = JSON.parse(userSelectionJson);
            userSelectionValidationResult.IsRightSelection = isRightSelection;
            return Observable.of(userSelectionValidationResult);
        }        
    }
}