import cors from "cors";
import { config } from "dotenv";
import express from "express";
import Joi from "joi";
import { prisma, replicate } from "./config/config.js";

config()

const app = express();

app.use(cors())
app.use(express.json())

app.get("/",async(req,res)=>{
  res.send("Hi")
})

const schema = Joi.object({
  numOfOutput:Joi.number().min(1).max(4).default(1),
  prompt:Joi.string().required().max(100)
})

app.post("/generate",async(req,res)=>{
  try {
    const { value,error } = schema.validate(req.body)
  
    if(error){
      res.status(400).json(error)
      return
    }
    
    const { prompt,numOfOutput } = value
    
    const input = {
      width: 1024,
      height: 1024,
      prompt,
      scheduler: "DDIM",
      num_outputs: numOfOutput,
      guidance_scale: 0,
      negative_prompt: "worst quality, low quality",
      num_inference_steps: 4
    }
    const output = await replicate.run(
    "bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f",
    {
      input
    });

    if(output.length === 0){
      res.status(400).json({message:"Try again"})
      return
    }

    const prediction = await prisma.prediction.create({
      data:{
        input,
        output
      }
    })
    
    if(!prediction){
      res.status(400).json({message:"Try again"})
      return
    }

    res.status(201).json(output)

  } catch (error) {
    res.status(500).json({error})
  }
})
app.listen(8000,()=>{
    console.log("connected")
})