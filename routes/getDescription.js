const express=require('express')
const WeekList=require('../models/weekList')
const isLoggedIn=require('../middlewares/authMiddleware')

const router=express.Router()

router.get('/:weekListId',isLoggedIn,async (req,res)=>{
    try{
        const userId=req.user._id
        const descriptionId=req.params.weekListId
        const weekListDescription=await WeekList.findOne({_id: descriptionId, userId})
        if(weekListDescription){
            res.send(weekListDescription)
        }
        else{
            res.status(404).json({message:'Description not found'})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({ message: 'Something went wrong' });
    }

})

module.exports=router