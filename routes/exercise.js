const router = require('express').Router();
const { check, validationResult, query } = require('express-validator');
const { addExerciseToUser } = require('../controllers/exercise');

router.post('/add', [
    check('userId')
        .not().isEmpty().withMessage('UserId cannot be empty')
        .isString().withMessage('UserId must be a string')
        .isLength({ min: 8, max: 8 }).withMessage('UserId must be equal to 8 chars'),
    check('description')
        .not().isEmpty().withMessage('Description cannot be empty')
        .isString().withMessage('Description must be a string'),
    check('duration')
        .isNumeric().withMessage('Duration must be a number (in mins)'),
    check('date')
        .optional().isISO8601().toDate().withMessage('Date must be in the format YYYY-MM-DD')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userId, description, duration, date } = req.body;
    try {
        const resp = await addExerciseToUser(userId, description, duration, date);
        return res.status(200).json(resp);

    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Internal Server Error');
    }


})

router.get('/log', [
    query('userId')
        .not().isEmpty().withMessage('userId cannot be empty')
        .isLength({ min: 8, max: 8 }).withMessage('UserId must be equal to 8 chars'),
    query('from')
        .optional().isISO8601().toDate().withMessage('From must be in the format YYYY-MM-DD'),
    query('to')
        .optional().isISO8601().toDate().withMessage('From must be in the format YYYY-MM-DD'),
    query('limit')
        .optional().isISO8601().toDate().withMessage('From must be in the format YYYY-MM-DD')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userId, from, to, limit } = req.query;
    return res.status(200).json({ userId, from });
})

module.exports = router;