import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");

export interface IAppConfig {
    baseEndpoint: string;
    apiEndpoint: string;
    rightAnswerPoint: number;
    wrongAnswerPoint: number;
    winPoint: number;
}

export const AppConfig: IAppConfig = {
    //apiEndpoint: "http://api.movieconnections.huretsucuklari.com/api/",
    baseEndpoint: "http://localhost:52368/",
    apiEndpoint: "http://localhost:52368/api/",
    rightAnswerPoint: 10,
    wrongAnswerPoint: 20,
    winPoint: 100
};