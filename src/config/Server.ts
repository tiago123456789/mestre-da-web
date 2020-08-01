import express from "express";
import path from "path";
import "./LoaderEnvironmentVariable";
import AppRoutes from "../routes/index";

const app = express();
const cors = require("cors");



// Setting middleware make parse datas to json.
app.use(express.json());

// Setting middleware enable cors in application.
app.use(cors());

// Loading routes application.
AppRoutes(app);

app.get("/test", (request, response) => response.json({ msg: "Success!!! " }))

export default app;