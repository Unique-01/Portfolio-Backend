require("dotenv").config();
require("./config/database");

const express = require("express");
const path = require("path");
const fs = require("fs");

const projectRouter = require("./routes/Project");
const contactRouter = require("./routes/Contact");

const port = process.env.PORT;

const app = express();

const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(express.json());
app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", projectRouter);
app.use("/api", contactRouter);

app.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
});
