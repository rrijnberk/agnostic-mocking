import {EndpointMatcher} from "../../src/matchers/endpoint.matcher";

describe('The endpoint matcher', () => {
    const endpoints = {
        simple: '/api/someservice/v1',
        id: '/api/someservice/v1/404',
        uuid: '/api/someservice/v1/46668122-6fac-11e7-907b-a6006ad3dba0',
        complex: '/api/someservice/v1/404/flamel'
    };

    it('should work as a standard regular expression.', () => {
        const matcher = new EndpointMatcher('/api/someservice/v1');
        expect(matcher.test(endpoints.simple)).toBeTruthy();
    });

    describe(': parameter config :', () => {
        it('should work with single number wildcard', () => {
            const matcher = new EndpointMatcher('/api/someservice/v1/{id:number}');
            expect(matcher.test(endpoints.id)).toBeTruthy();
        });

        it('should work with single string wildcard', () => {
            const matcher = new EndpointMatcher('/api/someservice/v1/{id:string}');
            expect(matcher.test(endpoints.uuid)).toBeTruthy();
        });

        it('should work with multiple wildcards', () => {
            const matcher = new EndpointMatcher('/api/someservice/v1/{id:number}/{name:string}');
            expect(matcher.test(endpoints.complex)).toBeTruthy();
        });
    });

    describe('params', () => {
        it('should return the id.', () => {
            const matcher = new EndpointMatcher('/api/someservice/v1/{id:number}');
            expect(matcher.params(endpoints.id)).toEqual([
                { key: 'id', value : 404 }
            ]);
        });

        it('should return the uuid.', () => {
            const matcher = new EndpointMatcher('/api/someservice/v1/{uuid:string}');
            expect(matcher.params(endpoints.uuid)).toEqual([
                { key: 'uuid', value: '46668122-6fac-11e7-907b-a6006ad3dba0' }
            ]);
        });

        it('should return the id and name.', () => {
            const matcher = new EndpointMatcher('/api/someservice/v1/{id: number}/{name: string}');
            expect(matcher.params(endpoints.complex)).toEqual([
                { key: 'id', value: 404 },
                { key: 'name', value: 'flamel' }
            ]);
        });
    });
});