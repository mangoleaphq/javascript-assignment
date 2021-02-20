require('../db/mongoose')
const express = require('express')
const restaurant = require('../controllers/restaurant')
const router = new express.Router()
const auth = require('../middleware/ownerAuth')

//Add restaurant by owner
router.post('/restaurants/add',auth,restaurant.restaurant_add)

//View restaurant by owner
router.get('/restaurants/view',auth,restaurant.restaurant_view)

//Delete restaurant by owner
router.delete('/restaurants/delete/:id',auth,restaurant.restaurant_delete)

module.exports = router