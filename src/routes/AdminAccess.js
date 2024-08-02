require("dotenv").config();
const express = require("express");

const router = express.Router();

const accessCode = process.env.ADMIN_ACCESS_CODE;

router.post("/admin", async (req, res) => {
    const { code } = req.body;
    if(code){
        if (code.toString() === accessCode.toString()) {
            return res.send({ message: "Success" });
        } else {
            return res.status(403).send({ error: "Invalid Code" });
        }
    }else{
        return res.status(400).send({error:"Invalid Code"})
    }
  
});

module.exports = router;
