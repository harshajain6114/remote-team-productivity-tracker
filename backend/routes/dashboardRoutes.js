const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/roleMiddleware')('admin');
const { dashboardSummary } = require('../controllers/dashboardController');

router.use(auth);
router.get('/summary', isAdmin, dashboardSummary);

module.exports = router;