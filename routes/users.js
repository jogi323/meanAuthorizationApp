var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var controller=require("../controllers/userActions");
var passport=require("passport");
/* GET users listing. */
router.post('/register', function(req, res, next) {
  controller.register(req,res);
});
//To login
router.post('/login', function(req, res, next) {
  controller.authenticate(req,res);
});
// router.get('/validate', function(req, res, next) {
//   res.send('respond with a resource');
// });
// to get Profile
router.get('/profile',function(req, res, next) {
  controller.usersProfile(req,res);
});
router.get('/contactus', passport.authenticate('jwt',{session:false}),function(req, res, next) {
  res.json({user:req.user});
});
router.get('/aboutus', passport.authenticate('jwt',{session:false}),function(req, res, next) {
  res.json({user:req.user});
});
//
router.post('/search',function(req,res){
  controller.searchUser(req,res);
});
//
router.post('/searchuser',function(req,res){
  controller.usersSearch(req,res);
});
//To get all users.
router.get('/usersdata',function(req,res){
  controller.allUsers(req,res);
});
//To generate Otp
router.post('/generateOtp',function(req,res){
  controller.generateOTP(req,res);
});
//To Verify Otp 
router.post('/checkOtp',function(req,res){
  controller.checkOtp(req,res);
});
//To Reset Password
router.post('/resetPassword',function(req,res){
  controller.resetPassword(req,res);
});
module.exports = router;
