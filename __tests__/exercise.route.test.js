const request = require('supertest');
const app = require('../app');
const mongodb = require('../mongodb');
const exercise1 = {
    userId: "12345678", // Non-existant UserId
    description: "hello world 2",
    duration: 12,
    date: "2019-09-09"
}
const exercise2 = {
    userId: "M6J6boiv", //Valid User
    description: "hello world 1",
    duration: 30,
    date: "2019-09-10"
}

describe('Exercise Routes', () => {
    beforeAll(() => {
        mongodb.connect(process.env.MLAB_URI);
    })

    it('should not create a new exercise if user doesn\'t exist', async (done) => {
        const res = await request(app)
            .post('/api/exercise/add')
            .send(exercise1);
        expect(res.statusCode).toBe(404);
        expect(res.body).toBe(`User with id ${exercise1.userId} not found`);
        done();
    });

    it('should create a new exercise', async (done) => {
        const res = await request(app)
            .post('/api/exercise/add')
            .send(exercise2);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        done();
    })


    afterAll((done) => {
        mongodb.disconnect(done);
    })
})