const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { startTask, stopTask, myTasks, allTasks, summary } = require('../controllers/taskController');
const isAdmin = require('../middleware/roleMiddleware')('admin');

router.use(auth);
router.post('/start', startTask);
router.patch('/stop/:id', stopTask);
router.get('/my', myTasks);
router.get('/summary', summary);
router.get('/all', isAdmin, allTasks);

module.exports = router;
