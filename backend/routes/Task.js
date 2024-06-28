const express = require('express');
const { createDB,createEntry, showAllEntries,deleteEntry } = require('../controllers/TaskController');


const router = express.Router();

router.get('/create/database', createDB);
router.post('/addEntry',createEntry)
router.get('/getAllEntries',showAllEntries);
router.delete('/deleteEntry/:id',deleteEntry);


module.exports = router;