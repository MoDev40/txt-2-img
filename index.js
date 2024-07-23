import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { replicate } from "./config/config.js";

config()

const app = express();

app.use(cors())

app.get("/",async(req,res)=>{
    const output = await replicate.run(
        "bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f",
        {
      input: {
        width: 1024,
        height: 1024,
        prompt: "a portrait man of a rounded profile picture ",
        scheduler: "DDIM",
        num_outputs: 1,
        guidance_scale: 0,
        negative_prompt: "worst quality, low quality",
        num_inference_steps: 4
      }
    }
  );
    res.send(output)
})


app.listen(8000,()=>{
    console.log("connected")
})