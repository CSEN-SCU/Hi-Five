console.log("start.js");

import express from "express"; // import { Router } from "express";
import cookieParser from "cookie-parser";
import { loginRoute, redirectRoute } from "./auth.js"
import { testRoute } from "./test.js" // DEBUG

const PORT = 3000;
const app = express();
app.use(cookieParser());

app.get("/", (req, res) => { res.json("Hi-Five Backend") });

loginRoute(app);
redirectRoute(app);
testRoute(app); // DEBUG

app.listen(PORT, () => {
  console.log(`app.listen: App listening on port ${PORT}`);
});