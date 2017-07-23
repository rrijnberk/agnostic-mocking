import {EndpointMatcher} from "../matchers/endpoint.matcher";

export function asArray()  {
    return this.selected;
}

export function asItem(filters: any[]) {
    let results = this.selected;
    filters.forEach(filter => {
        results = this.selected.filter(item => {
            return item[filter.key] === filter.value
        });
    });
    return results[0];
}

export class ResponseHandler {
    private handlers: Map<EndpointMatcher, Function> =
        new Map<EndpointMatcher, Function>();

    protected selected;

    add(endpointConfig: string, responseFunction: Function = asArray) {
        this.handlers.set(new EndpointMatcher(endpointConfig), responseFunction.bind(this));
    }

    getByEndpoint(endpoint: string): any {
        let result = null;
        this.handlers.forEach((responseFunction: Function, matcher: EndpointMatcher) => {
            if(matcher.test(endpoint)) {
                result =  responseFunction(matcher.params(endpoint));
            }
        });
        return result;
    }
}