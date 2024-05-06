console.log("start.js"); 

import express from "express";
import cookieParser from "cookie-parser";
import { loginRoute, redirectRoute, refreshAccessToken, global_user_id } from "./authentication.js"


const PORT = 3000;
// import { Router } from "express";
const app = express();
app.use(cookieParser());

app.get("/", (req, res) => { res.send("Hi-Five Backend") });

loginRoute(app);
redirectRoute(app);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});