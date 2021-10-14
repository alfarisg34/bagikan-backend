const express = require("express");
const router = express.Router();
const jwt=require("jsonwebtoken")
const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const validateLoginInput = require("../../validation/loginValidation");

router.post("/register",(req,res) =>{
    Admin.create(req.body).then(function(admin){
        res.send(admin);
    })
});
router.post("/login",(req,res) =>{
    const{email,password}=req.body;
    Admin.findOne({email}).exec((err,admin)=>{
        if(err){
            return res.status(400).json({
                error:"This admin doesn't exist,signup first"
            })
        }
        if(admin.password !== password){
            return res.status(400).json({
                error:"Email or password incorrect"
            })
        }
        const token = jwt.sign({_id:admin._id},'mypersonalkey1234',{expiresIn:'3h'})
        const {_id,username,email}=admin;

        res.json({
            status:"success",
            massage:"Login Berhasil!",
            token,
            data:{_id,username,email}
        })
    })
})
module.exports = router;