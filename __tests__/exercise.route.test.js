const request = require('supertest');
const app = require('../app');
const mongodb = require('../mongodb');
const exercise = {
    userId: "12345678", // Non-existant UserId
    description: "hello world 2",
    duration: "12",
    date: "2019-09-09"
}

describe('Exercise Routes', () => {
    beforeAll(() => {
        mongodb.connect(process.env.MLAB_URI);
    })

    it('should not create a new exercise if user doesn\'t exist', async (done) => {
        const res = await request(app)
            .post('/api/exercise/add')
            .send(exercise);
        expect(res.statusCode).toBe(404);
        expect(res.body).toBe(`User with id ${exercise.userId} not found`);
        done();
    })

    afterAll((done) => {
        mongodb.disconnect(done);
    })
})