const express = require('express');
const { createDB,createEntry, showAllEntries,deleteEntry, editEntry, getEntryById, searchEntries } = require('../controllers/TaskController');


const router = express.Router();

router.get('/create/database', createDB);
router.post('/addEntry',createEntry)
router.get('/getAllEntries',showAllEntries);
router.get('/getEntry/:id',getEntryById);
router.delete('/deleteEntry/:id',deleteEntry);
router.post('/editEntry/:id',editEntry);
router.get('/searchEntries/:Name',searchEntries);


module.exports = router;