import dotenv from "dotenv";
import path from "path";

// Loading environment variables
dotenv.config({ path: path.join(__dirname, "..", "..", ".env")});