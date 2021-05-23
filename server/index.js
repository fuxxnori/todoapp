const express = require("express");
const cors = require("cors");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tasks = require("./routes/api/tasks");

app.use("/api/tasks", tasks);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Sever started on port ${port}`);
});