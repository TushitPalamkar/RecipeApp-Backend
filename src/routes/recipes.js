import express from 'express';
import mongoose from 'mongoose';
import { RecipeModel } from "../models/Recipes.js";
import { userModel } from '../models/users.js';
const router=express.Router();
router.get('/',async(req,res)=>{
    try{
        const response=await RecipeModel.find({});
        res.json(response)
    }catch(error)
    {
        res.status(404).json({msg:error})
    }
})
router.post('/',async(req,res)=>{
    const recipe=new RecipeModel(req.body)
    try{
        const response=await recipe.save();
        res.json(response)
    }catch(error)
    {
        res.status(404).json({msg:error})
    }
})
router.put('/',async(req,res)=>{
    try{
        
    const recipe=await RecipeModel.findById(req.body.recipeID)
    const user=await userModel.findById(req.body.userID)
    user.savedRecipes.push(recipe);
    await user.save()
    res.json({savedRecipes:user.savedRecipes})
    }
    catch(error)
    {
        res.json({msg:error});
    }
})
router.get('/savedRecipes/ids/:userID',async(req,res)=>{
    try{
        const user= await userModel.findById(req.params.userID)
        res.json({savedRecipes:user.savedRecipes})
    }
    catch(error){
        res.send({msg:error})
    }
})
router.get('/savedRecipes/:userID',async(req,res)=>{
    try{
        const user=await userModel.findById(req.params.userID)
        const savedRecipes=await RecipeModel.find({_id:{$in:user.savedRecipes}})
        res.json({savedRecipes})
    }
    catch(error){
        res.send({msg:error})
    }
})
export {router as recipeRouter}