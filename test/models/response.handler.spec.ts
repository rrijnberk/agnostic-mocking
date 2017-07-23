import {asItem, ResponseHandler} from "../../src/models/response.handler";

class TestMock extends ResponseHandler {
    selected = [
        {
            id: 401,
            name: 'Nicholas Flamel'
        }, {
            id: 402,
            name: 'Perenelle Flamel'
        }, {
            id: 404,
            name: 'Dr. John Dee'
        }, {
            id: 404,
            name: 'TheotherJohnDee',
            payload: 'Testcase for compound path'
        }

    ]
}

describe('The response handler', () => {
    const endpoints = {
        simple: '/api/someservice/v1',
        id: '/api/someservice/v1/404',
        compound: '/api/someservice/v1/404/TheotherJohnDee'
    };

    let responseHandler;

    beforeEach(() => {
        responseHandler = new TestMock();
    });

    describe('API', () => {
        it('should declare a \'add\' method', () => {
            expect(typeof responseHandler.add).toBe('function');
        });

        it('should declare a \'getByEndpoint\' method', () => {
            expect(typeof responseHandler.getByEndpoint).toBe('function');
        });
    });

    it('should return a undefined for a non-existing endpoint', () => {
        expect(responseHandler.getByEndpoint(endpoints.simple)).toBeNull();
    });

    it('should return a response for an existing endpoint', () => {
        responseHandler.add('/api/someservice/v1/{id : number}', asItem);
        expect(responseHandler.getByEndpoint(endpoints.id)).toEqual({
            id: 404,
            name: 'Dr. John Dee'
        });
    });

    it('should return a response for an existing endpoint', () => {
        responseHandler.add('/api/someservice/v1/{id : number}/{name: string}', asItem);
        expect(responseHandler.getByEndpoint(endpoints.compound)).toEqual({
            id: 404,
            name: 'TheotherJohnDee',
            payload: 'Testcase for compound path'
        });
    });


});