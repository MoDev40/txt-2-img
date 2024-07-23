import Replicate from "replicate";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
config()

export const replicate = new Replicate({
    auth:process.env.REPLICATE_TOKEN,
})

export const prisma = new PrismaClient()