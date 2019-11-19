const router = require('express').Router();

const userRoutes = require('./user');
const exerciseRoutes = require('./exercise');

router.use(userRoutes);
router.use(exerciseRoutes);

module.exports = router;    