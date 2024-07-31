const express = require("express");
const Project = require("../models/Project");
const fileUpload = require("../middlewares/fileUpload");

const router = express.Router();

router.post("/projects", fileUpload.single("image"), async (req, res) => {
    const { name, description, link } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";
    try {
        const project = new Project({ name, description, link, image });
        await project.save();
        res.send(project);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find({});
        res.send(projects);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/projects/:projectId", async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await Project.findById(projectId);
        return res.send(project);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.patch(
    "/projects/:projectId",
    fileUpload.single("image"),
    async (req, res) => {
        const { name, description, link } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : "";
        const { projectId } = req.params;
        try {
            const project = await Project.findByIdAndUpdate(
                projectId,
                {
                    name,
                    description,
                    link,
                    image,
                },
                { new: true }
            );
            if (!project) {
                return res.status(404).send({ error: "Project not found" });
            }
            res.send(project);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
);

router.delete("/projects/:projectId", async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await Project.findByIdAndDelete(projectId);
        if (!project) {
            return res.status(404).send({ error: "Project not found" });
        }
        res.send({ message: "Project deleted successfully", project });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
