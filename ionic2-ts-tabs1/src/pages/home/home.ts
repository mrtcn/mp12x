import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { ConnectionService } from '../../app/movie-connection/connection.service';

import {
    SearchApiModel, MovieConnection,
    GameInitialize, UserSelections
} from '../../app/movie-connection/connection.model';
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';

import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ConnectionService]
})
export class HomePage implements OnInit {
    onGameLoad: boolean;
    searchTerm: string = '';
    searchTermModel: SearchApiModel;
    connectionSearchBox: FormControl;
    searching: any = false;
    isWin: boolean = false;
    
    private _answer = new BehaviorSubject<number>(null);
    answer = this._answer.asObservable();
    
    private _gameState = new BehaviorSubject<number>(null);
    gameState = this._gameState.asObservable();

    private _items = new BehaviorSubject<MovieConnection[]>([]);
    items = this._items.asObservable();

    private _gameInit = new BehaviorSubject<GameInitialize>(null);
    gameInit = this._gameInit.asObservable();

    private _userSelections = new BehaviorSubject<UserSelections>(null);
    userSelections = this._userSelections.asObservable();

    constructor(public navCtrl: NavController, public connectionService: ConnectionService, private http: Http) {

        this.onGameLoad = false;
        this.connectionSearchBox = new FormControl();
    }

    ngOnInit() {
        //Get Game Info Such as BaseActor, DestinationActor, ConnectionPaths etc.
        let gameInitObservable = this.connectionService.getGameInit();
        gameInitObservable            
            .subscribe(result => {
            this._gameInit.next(result);

            //Store Game Init Data
            var userSelections = this.connectionService.setLocalStorageOnInit(result);            
            this._userSelections.next(userSelections);

            this._gameState.next(2);
        });
    }

    ionViewDidLoad() {
        this.searching = false;        
    }

    searchConnection() {
        this.searching = true;
        if (this.searchTerm.length > 1) {
            let searchTermModel = new SearchApiModel(this.searchTerm);
            let observable = new Observable<MovieConnection[]>();
            if (this._gameState.getValue() === 2) {
                observable = this.connectionService.getMovies(searchTermModel);
            } else if (this._gameState.getValue() === 1) {
                observable = this.connectionService.getActors(searchTermModel);
            }
            
            this.onGameLoad = true;
            //this.connectionSearchBox.valueChanges.debounceTime(700).subscribe(x => {
                //this.searching = false;
                observable.subscribe(result => {
                    this._items.next(result);
                    this.searching = false;
                });
            //});
            
        } else {
            this.clearConnection();
        }
    }

    clearConnection() {
        this._items.next(null);
    }

    checkSelectedItem(id: number, title: string, gameState: number) {
        this.connectionService.checkConnection(id, title, gameState).subscribe(result => {
            let isRightSelection: number = result.IsRightSelection;
            if (isRightSelection === 3) {
                this.isWin = true;
            }
            
            this._answer.next(isRightSelection);
            this._userSelections.next(result.UserSelections);
            if (isRightSelection === 1) {
                gameState = gameState === 1 ? 2 : 1;
            }
                
            this._gameState.next(gameState);
            this.clearConnection();
            this.searchTerm = "";
        });
    }

    onLink(url: string) {
        window.open(url);
    }
}
