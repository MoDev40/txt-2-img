import Replicate from "replicate";
import { config } from "dotenv";
config()
export const replicate = new Replicate({
    auth:process.env.REPLICATE_TOKEN,
})