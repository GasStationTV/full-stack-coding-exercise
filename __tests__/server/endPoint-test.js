const request = require('supertest');
const app = require('../../src/server/server')

describe('Test site routes', () => {
    test('It shoudl respond with avalable sites', () => {
        return request(app).get("/api/site").then(response => {
            console.log(response)
            expect(response.statusCode).toBe(200)
        })
    });
})
