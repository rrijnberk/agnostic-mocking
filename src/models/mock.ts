import {ResponseHandler} from "./response.handler";
export class Mock extends ResponseHandler {
    private scenarios: Map<string, any> = new Map<string, any>();

    get scenario() {
        return {
            get: (key: string): any => {
                return this.scenarios.get(key);
            },
            select: (key): void => {
                this.selected = this.scenario.get(key);
            },
            set: (key: string, value: any): void => {
                this.scenarios.set(key, value);
            }
        }
    }



}