const router = require('express').Router();
const { check, param, validationResult } = require('express-validator');
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

router.post('/new-user', [
    check('username')
        .not().isEmpty().withMessage('Username cannot be empty')
        .isString().withMessage('Username must be a string')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await addUser(req.body.username);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Internal Server Error');
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

router.delete('/user/:id', [
    param('id')
        .not().isEmpty().withMessage('UserId cannot be empty')
        .isLength({ min: 8, max: 8 }).withMessage('UserId must be equal to 8 chars')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        await deleteUser(req.params.id);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Internal Server Error');
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
        return res.status(200).json(users);
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Internal Server Error');
    }
})

module.exports = router;    