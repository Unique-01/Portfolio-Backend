const express = require("express");
const Contact = require("../models/Contact");
const sendContactMail = require("../utils/ContactMail");

const router = express.Router();

router.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const contact = new Contact({ name, email, message });
        await contact.save();
        sendContactMail(name, email, message);
        res.status(201).send(contact);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router
