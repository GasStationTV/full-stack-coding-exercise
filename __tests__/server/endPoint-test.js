const request = require('supertest');
import {setupApp} from '../../src/server/server';

//Important: Please update testSiteKey before running test cases
const testSiteKey=3;
describe('Test site routes', () => {
    let agent=null;

    beforeAll(() => setupApp().then(expressApp => {
      agent = request.agent(expressApp);
    }));
    test('It shoudl respond with avalable sites', (done) => {
        return agent.get("/api/site").set('Accept', 'application/json').then(response => {
            expect(response.statusCode).toBe(200)
            done()
        })
    });
    test('It should create new site', (done) => {
        return agent.post("/api/site")
          .type('form').send({name:"Test Site Name",address:"Test Site Address"}).
          set('Accept', 'application/json').then(response => {
            expect(response.statusCode).toBe(200)
            done()
        })
    },10000);
    test('It should create new flag', (done) => {
        agent.post("/api/flag")
          .type('form').send({startDate:"2017-08-01",endDate:"2017-08-30",flagType:"GSTV - Unsellable",siteKey:testSiteKey}).
          set('Accept', 'application/json').then(response => {
            expect(typeof response).toBe('object')
            expect(response.body.flagType).toEqual("GSTV - Unsellable")
            expect(response.body.endDate).toEqual("2017-08-30")
            expect(response.body.startDate).toEqual("2017-08-01")
            done()
          })

    },10000);
    test('It should update existing flag', (done) => {
        agent.put("/api/flag/"+testSiteKey+"/0")
          .type('form').send({startDate:"2017-08-01",endDate:"2017-08-30",flagType:"GSTV - Research Survey"}).
          set('Accept', 'application/json').then(response => {
            expect(typeof response).toBe('object')
            expect(response.body.flagType).toEqual("GSTV - Research Survey")
            expect(response.body.endDate).toEqual("2017-08-30")
            expect(response.body.startDate).toEqual("2017-08-01")
            done()
          })

    },10000);
    test('It should delete existing flag', (done) => {
        agent.delete("/api/flag/"+testSiteKey+"/0")
          .type('form').
          set('Accept', 'application/json').then(response => {
            expect(typeof response).toBe('object')
            expect(response.body.message).toEqual('Flag Deleted')
            done()
          })

    },10000);
})
