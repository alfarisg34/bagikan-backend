const express = require("express");
const router = express.Router();
const jwt=require("jsonwebtoken")
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const validateRegisterInput = require("../../validation/loginValidation");

const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox861aaa4a49844cc7b6512bcd31d76942.mailgun.org';
const mg = mailgun({apiKey: '08484bf0413dadc2a1e27a3b31e8062b-2ac825a1-6aad7fe0', domain: DOMAIN});

router.post("/register",(req,res) =>{
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    });
    newUser.save()
    return res.send({
        status:"success",
        massage:"Register akun berhasil",
        data:newUser
    })
    // bcrypt.genSalt(10,(err,salt) => {
    //     bcrypt.hash(newUser.password,salt,(err,hash) => {
    //         if(err) throw err;
    //         newUser.password = hash;
    //         newUser.save()
    //             .then(user => res.json(user))
    //             .catch(err => console.log(err))
    //         // return res.json(newUser);
    //         return res.send({
    //             status:"success",
    //             massage:"Register akun berhasil",
    //             data:newUser
    //         })
    //     })
    // });
}),

// router.post("/register",(req,res) =>{
//     var {username,email,password}=req.body;
//     const {errors,isValid} = validateRegisterInput(req.body);

//     if(!isValid){
//         return res.status(400).json(errors);
//     }
//     User.findOne({email})
//         .then(user => {
//             if(user){
//                 return res.status(400).json({'email' : 'Alamat email sudah digunakan'});
//             }else{
//                 // bcrypt.genSalt(10,(err,salt) => {
//                 //         bcrypt.hash(password,salt,(err,hash) => {
//                 //             if(err) throw err;
//                 //             password = hash;
//                 //         })
//                 //     });
//                 //     console.log(password)
//                 //email verif
//                 const token = jwt.sign({username,email,password},'accountactivatekey123',{expiresIn:'20m'})
//                 const data = {
//                     from: 'Bagikan@samples.mailgun.org',
//                     to: email,
//                     subject: 'Email Verification',
//                     html:`
//                         <h2>Please click on given link to activate your account</h2>
//                         <p>http://localhost:5000/authentication/activate/${token}</p>
//                     `
//                     // text: 'Verif email here'
//                 };
//                 mg.messages().send(data, function (error, body) {
//                     if(error){
//                         return res.json({
//                             massage:err.massage
//                         })
//                     }
//                     return res.json({massage:'Email has been sent,kindly activate your account'})
//                     console.log(body);
//                 });


//                 // const newUser = new User({
//                 //     username : req.body.username,
//                 //     email : req.body.email,
//                 //     password : req.body.password
//                 // });
//                 // bcrypt.genSalt(10,(err,salt) => {
//                 //     bcrypt.hash(newUser.password,salt,(err,hash) => {
//                 //         if(err) throw err;
//                 //         newUser.password = hash;
//                 //         newUser.save()
//                 //             .then(user => res.json(user))
//                 //             .catch(err => console.log(err))
//                 //         // return res.json(newUser);
//                 //         return res.send({
//                 //             status:"success",
//                 //             massage:"Register akun berhasil",
//                 //             data:newUser
//                 //         })
//                 //     })
//                 // });
//             }
//         })
// });
router.post("/email-activate",(req,res) =>{
    const {token} = req.body;
    if(token){
        jwt.verify(token,'accountactivatekey123',function(err,decodedToken){
            if(err){
                return res.status(400).json({error:'Incorrect or Expired link.'})
            }
            const {username,email,password} = decodedToken;
            User.findOne({email}).exec((err,user)=>{
                if(user){
                    return res.status(400).json({error:"User with this email already exists."});
                }
                let newUser = new User({username,email,password});
                 bcrypt.genSalt(10,(err,salt) => {
                    bcrypt.hash(newUser.password,salt,(err,hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                    })
                });
                newUser.save((err,success)=>{
                    if(err){
                        console.log("error in signup while account activation: ",err);
                        return res.status(400),json({error: 'Error activating account'})
                    }
                    res.json({
                        massage: "Signup Success!"
                    })
                })
            })
        })
    }else{
        return res.json({error:"Something went wrong!!!"})
    }
});

router.post("/login",(req,res) =>{
    const{email,password}=req.body;
    User.findOne({email}).exec((err,user)=>{
        if(err){
            return res.status(400).json({
                error:"This user doesn't exist,signup first"
            })
        }
        if(user.password !== password){
            return res.status(400).json({
                error:"Email or password incorrect"
            })
        }
        const token = jwt.sign({_id:user._id},'mypersonalkey1234',{expiresIn:'3h'})
        const {_id,username,email}=user;

        res.json({
            status:"success",
            massage:"Login Berhasil!",
            token,
            data:{_id,username,email}
        })
    })
})
module.exports = router;