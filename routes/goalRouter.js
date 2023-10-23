const express = require('express')
const router= express.Router();
// require our exports
const { 
    getAllGoals,
    getSingleGoal,
    createGoal,
    updateGoal,
    deleteGoal,
}=  require('../controllers/goalController');
const { get } = require('mongoose');

router.route('/').get(getAllGoals).post(createGoal)
router.route('/:goalId').get(getSingleGoal).patch(updateGoal).delete(deleteGoal)

// set up our routes

module.exports= router