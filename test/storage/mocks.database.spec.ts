import {MocksDatabase} from "../../src/storage/mocks.database";

describe('The mocks database', () => {
    describe('API', () => {
        it('should declare a create attribute', () => {
            expect(MocksDatabase.create instanceof Function).toBeTruthy();
        });

        it('should declare a get attribute', () => {
            expect(MocksDatabase.get instanceof Function).toBeTruthy();
        });

        describe('request', () => {
            it('to be defined', () => {
                expect(MocksDatabase.request).toBeDefined();
            });

            it('delete to be defined', () => {
                expect(typeof MocksDatabase.request.delete).toBe('function');
            });

            it('get to be defined', () => {
                expect(typeof MocksDatabase.request.get).toBe('function');
            });

            it('post to be defined', () => {
                expect(typeof MocksDatabase.request.post).toBe('function');
            });

            it('put to be defined', () => {
                expect(typeof MocksDatabase.request.put).toBe('function');
            });
        });
    });

    it('should create unknown mocks and scenario\'s without issue ', () => {
        let error;
        try {
            MocksDatabase.create('coffee', 'mocha', { validate: 'success' });
        } catch(err) {
            error = err;
        }
        expect(error).toBeUndefined();
    });

    it('should not create a new mock for a second response creation call', () => {
        MocksDatabase.create('coffee', 'latte', { validate: 'success 2' });
    });

    describe('should return', () => {
        it('a created mock when requested', () => {
            expect(MocksDatabase.get('coffee')).toBeDefined();
        });

        it('should return the correct mock when requested', () => {
            const testcase = MocksDatabase.get('coffee');
            expect(testcase.scenario.get('mocha').validate).toBe('success', 'We should get a response for mocha');
            expect(testcase.scenario.get('latte').validate).toBe('success 2', 'We should get a response for latte');
        });
    });
});