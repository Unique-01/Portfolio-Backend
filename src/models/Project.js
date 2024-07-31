const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    link: {
        type: String,
    },
    image: {
        type: String,
    },
});

const Project = new mongoose.model("Project", ProjectSchema);
module.exports = Project;
