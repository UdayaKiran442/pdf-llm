const express = require("express");
require("dotenv").config();
const userRouter = require("./routes/user.routes");
const projectsRouter = require("./routes/project.routes")
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use("/user", userRouter);
app.use("/projects", projectsRouter)

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
