const express = require('express');
const router = express.Router();
const { 
    getAllItems, 
    getItemById, 
    updateItem, 
    deleteItem, 
    createItem 
} = require('../controller/items-controller');

router.get('/items', getAllItems);

router.get('/items/:id', getItemById);

router.post('/items', createItem);

router.put('/items/:id', updateItem);

router.delete('/items/:id', deleteItem);

module.exports = router;
