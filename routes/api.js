const { Router } = require("express");
const router = Router();
// const router = express.Router();
// const express = require('express');

const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

//------------------------Auth----------------------
router.post("/register",function(req,res){ authController.register});
router.post("/login", function(req,res){ authController.login});
router.get("/logout", function(req,res){authController.logout});
router.get("/edit", function(req,res){authController.logout});
//------------------------Admin----------------------
router.get("/login/admin", function(req,res){adminController.login});
router.get("/logout/admin", function(req,res){adminController.logout});
router.delete("/deleteUser/:id",function(req,res){adminController.deleteUser});

module.exports = router;