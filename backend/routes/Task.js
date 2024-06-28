const express = require('express');
const { createDB } = require('../controllers/TaskController');


const router = express.Router();

router.get('/create/database', createDB);



module.exports = router;