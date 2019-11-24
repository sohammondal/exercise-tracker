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
    userId: "Gy61ibz3", //Valid User
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

    it('should return a log of exercises based on userId', async (done) => {
        const res = await request(app)
            .get('/api/exercise/log?userId=' + exercise2.userId);
        expect(res.body).toHaveProperty('count');
        expect(res.body.log).toBeInstanceOf(Array);
        done();
    })

    afterAll((done) => {
        mongodb.disconnect(done);
    })
})