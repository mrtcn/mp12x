export class MovieConnection {
    constructor(
        public id : number,
        public title: string,
        public gameState: number
    ){}
}
export class SearchApiModel {
    constructor(
        public searchText: string
    ) { }
}

export class ActorInfo {
    ActorId: number;
    ActorName: string;
}

export class MovieInfo {
    MovieId: number;
    MovieName: string;
}

export class ActorMoviePair {
    ActorInfo: ActorInfo;
    MovieInfo: MovieInfo;
}

export class ActorMovieConnection {
    ActorMovieInfo: ActorMoviePair[];
}

export class GameInitialize {
    BaseActorId: number;
    BaseActorName: string;
    DestinationActorId: number;
    DestinationActorName: string;
    ActorMovieConnections: ActorMovieConnection[];
    MaxBranchLevel: number;
}

export class GetConnectionPathsModel {
    BaseActorId: number;
    BaseActorName: string;
    DestinationActorId: number;
    DestinationActorName: string;
    ActorId : number;
    MovieId : number;
}

export class UserSelections {
    BaseActorId: number;
    BaseActorName: string;
    DestinationActorId: number;
    DestinationActorName: string;
    ActorMoviePairs: ActorMoviePair[];
}

export class UserSelectionValidationResult {
    UserSelections: UserSelections;
    IsRightSelection: number;
}



