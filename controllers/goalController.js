// to get access to db
const Goals = require('../models/goals')

// creating the fumc we need
const getAllGoals = async(req, res)=>{
    const goals = await Goals.find()
    res.status(200).json({ success: true, goals})
}
const getSingleGoal = async(req, res)=>{
   const {goalId}= req.params
   const goal= await Goals.findById({_id: goalId})
   if (!goal) {
    return res.status(404).json({success : false})
   }
   res.status(200).json({success: true, goal})
}
const createGoal = async(req, res)=>{
    const {title, description}= req.body
    if (!title || !description) {
        return res
        .status(400)
        .json({ success: false, msg: 'please provide necessary details'})
    }
    try{
        const goal = await Goals.create(req.body)
    res.status(201).json({success: true, goal}); 

    }catch(error){
        res.json(error);
        console.log(error);
    }
    
}
const updateGoal = async(req, res)=>{
    const {goalId}= req.params;
    try{
        const goal = await Goals.findByIdAndUpdate({_id: goalId}, req.body,{ 
            new: true,
            runValidators: true,
        })
        res.status(200).json({success: true, goal})
    }catch (error){
        res.json(error);
        console.log(error);
    }
    
}
const deleteGoal = async(req, res)=>{
    const {goalId}= req.params
    try{
        const goal= await Goals.findByIdAndDelete({_id: goalId})
        res.status(200).json({success: true})
    }catch (error){
        res.json(error);
        console.log(error);
    }
}

module.exports = {
    getAllGoals, getSingleGoal, createGoal, updateGoal, deleteGoal
}