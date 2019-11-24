const router = require('express').Router();
const { addUser, deleteUser, getUsers } = require('../controllers/user');


/**
* @api {post} /api/exercise/new-user
* @apiName Create new user
* @apiPermission open
* @apiGroup User
*
* @apiBody  {object}  { username: 'Some Name' }
*
* @apiSuccess (201) {Object} mixed `User` object
* @apiFaliure (409) {String} Username already exists
* @apiFaliure (500) {String} Internal Server Error
*/

router.post('/new-user', async (req, res) => {
    if (req.body.username) {
        try {
            let user = await addUser(req.body.username);
            res.status(201).json(user);
        } catch (error) {
            res.status(error.status || 500).json(error.message || 'Internal Server Error');
        }
    } else {
        res.status(400).json('Username cannot be empty');
    }
});

/**
* @api {del} /api/exercise/user/:userId
* @apiName Delete a user
* @apiPermission open
* @apiGroup User
*
* @apiParam  {String} [userId] userId
*
* @apiSuccess (200)
* @apiFaliure (404) {String} User not found
* @apiFaliure (500) {String} Internal Server Error
*/

router.delete('/user/:id', async (req, res) => {
    if (req.params.id) {
        try {
            await deleteUser(req.params.id);
            res.sendStatus(200);
        } catch (error) {
            res.status(error.status || 500).json(error.message || 'Internal Server Error');
        }
    } else {
        res.status(400).json('User id cannot be empty');
    }
})


/**
* @api {get} /api/exercise/users
* @apiName Get all users
* @apiPermission open
* @apiGroup User
*
* @apiParam  -
*
* @apiSuccess (200) {Array} Users List
* @apiFaliure (500) {String} Internal Server Error
*/

router.get('/users', async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(error.status || 500).json(error.message || 'Internal Server Error');
    }
})

module.exports = router;    