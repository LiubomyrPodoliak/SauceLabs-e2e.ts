import { APIRequestContext } from "@playwright/test";

export abstract class BaserApiConetext {
    constructor(protected request: APIRequestContext) {


    }
}