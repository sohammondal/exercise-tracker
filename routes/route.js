const router = require('express').Router();
const { addUser, deleteUser } = require('../controllers/user');

router.post('/user', async (req, res) => {
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

module.exports = router;    