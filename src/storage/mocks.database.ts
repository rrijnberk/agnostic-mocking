import {Mock} from "../models/mock";
import {HttpRequestType} from "../types/http.request.type";

export class MocksDatabase {
    private static database: Map<string, Mock> = new Map<string, Mock>();

    private static requestFactory(type: HttpRequestType) {
        return (endpoint: string) => {
            return this.getEndpointByType(type, endpoint)
        }
    }

    private static getEndpointByType(type: HttpRequestType, endpoint: string) {
        // this.database.forEach()
    }

    static create = (mockName: string, scenarioName: string, payload): void => {
        if (!MocksDatabase.database.get(mockName)) MocksDatabase.database.set(mockName, new Mock());
        MocksDatabase.database.get(mockName).scenario.set(scenarioName, payload);
    };

    static get = (key: string): Mock => {
       return MocksDatabase.database.get(key);
    };

    static get request() {
        return {
            delete: this.requestFactory(HttpRequestType.DELETE),
            get: this.requestFactory(HttpRequestType.GET),
            post: this.requestFactory(HttpRequestType.POST),
            put: this.requestFactory(HttpRequestType.PUT)
        }
    }
}