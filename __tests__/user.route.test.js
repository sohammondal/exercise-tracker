const request = require('supertest');
const app = require('../app');
const mongoDB = require('../mongodb');
const user = {
    username: 'rohanmondal'
};

describe('User Routes', () => {
    beforeAll(() => {
        mongoDB.connect(process.env.MLAB_URI);
    });

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/exercise/user')
            .send(user);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        user._id = res.body._id;
    });

    it('should not create a new user, if username already exists', async () => {
        const res = await request(app)
            .post('/api/exercise/user')
            .send(user);
        expect(res.statusCode).toBe(409);
        expect(res.body).toBe('Username already exists');
    });

    it('should delete a user', async (done) => {
        const res = await request(app).delete('/api/exercise/user/' + user._id);
        expect(res.statusCode).toBe(200);
        done();
    })

    it('should return a list of users', async (done) => {
        const res = await request(app).get('/api/exercise/users');
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThanOrEqual(0);
        done();
    });

    afterAll((done) => {
        mongoDB.disconnect(done);
    });
})