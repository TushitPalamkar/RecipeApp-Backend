import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import  {userRouter}  from "./src/routes/users.js";
import { recipeRouter } from "./src/routes/recipes.js";
import  dotenv  from "dotenv";
const app=express();
const PORT=3001 || process.env.PORT;
app.use(express.json());
app.use(cors())
dotenv.config();
app.use('/auth',userRouter)
app.use('/recipes',recipeRouter)
mongoose.connect(process.env.MONGO_URL)
.then(console.log('Database is successfully connected'))
.catch((error)=>{console.log(error)})
app.listen(PORT,()=>{console.log(`Server is listening on port 3001`)})
