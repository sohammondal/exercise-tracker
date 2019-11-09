const request = require('supertest');
const app = require('../app');

describe('User Routes', () => {

    let userId = null;

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/exercise/user')
            .send({
                username: 'rohanmondal'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        userId = res.body._id;
    });

    it('should not create a new user, if username already exists', async () => {
        const res = await request(app)
            .post('/api/exercise/user')
            .send({
                username: 'rohanmondal'
            });
        expect(res.statusCode).toBe(409);
        expect(res.body).toBe('Username already exists');
    });

    it('should delete a user', /* async */(done) => {
        // const res = await request(app).delete('/api/exercise/user/' + userId);
        // expect(res.statusCode).toBe(200);
        request(app).delete('/api/exercise/user/' + userId).expect(200).end(done);
    })
})