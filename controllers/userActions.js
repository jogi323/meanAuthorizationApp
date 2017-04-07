var mongoose = require('mongoose'); 
var connection = require("./userProfileSchema"); 
var passport = require("passport"); 
var jwt = require("jsonwebtoken"); 
var bcrypt = require('bcryptjs'); 
var twilio = require('twilio'); 
var CryptoJS = require("crypto-js"); 
const nodemailer = require('nodemailer'); 
const xoauth2 = require('xoauth2'); 
exports.register = function (req, res) {

    connection.find( {$and:[ {email:req.body.email },  {username:req.body.username }] }, function (err, docs) {
        if (err) {
            throw err; 
        }if (docs[0] == null) {
            var newUser = new connection( {
                firstName:req.body.firstname, 
                lastName:req.body.lastname, 
                email:req.body.email, 
                username:req.body.username, 
                password:req.body.password, 
                mobileNumber:req.body.mobile, 
                gender:req.body.gender, 
                image:req.body.image, 
                empId:req.body.empId,
                dob:req.body.dob,
                otp:'',
            }); 
//            var ciphertext = CryptoJS.AES.encrypt('password', 'secret key 123'); 
           
//             newUser.password = ciphertext; 
//                         newUser.save(); 
//                         console.log(newUser.password); 
//                         var bytes = CryptoJS.AES.decrypt(newUser.password.toString(), 'secret key 123'); 
// var plaintext = bytes.toString(CryptoJS.enc.Utf8); 
 
// console.log(plaintext); 
            bcrypt.genSalt(10, function (err, salt) {
                //console.log('gjuhfgjhgujg');
                bcrypt.hash(newUser.password, salt, function (err, hash) {
                    
                    if (err) {
                        throw err; 
                    }else {
                        //console.log(hash);
                        newUser.password = hash; 
                        newUser.save(); 
                    }
                    newUser.save(function (err, user) {
               // console.log(newUser.password);
                //console.log('newUser.password');
                if (err) {
                    throw err; 

                }else {
                    res.json( {status:200, msg:' register Successfully'}); 
                    

                  var transporter = nodemailer.createTransport( {
                        service:'gmail', 
                        auth: {
                            type:'OAuth2', 
                            user:'meanauthorizationapp@gmail.com', 
                            clientId:'19607707395-gnntp7qud83f17b64kmam0on3sjhdnte.apps.googleusercontent.com', 
                            clientSecret:'7_0lSsQn_Uj5809p6IZcZ3g9', 
                            refreshToken:'1/hgUApjsQ7qgJZ9X-zQc6d4HAHbZ4zVTa_ELyF5Wr7oY', 
                            accessToken:'ya29.GlslBHtbHdpMsoAR6OTrlbTd8uI9SKYm9BUxtsOiy0Z86qRopreLaP3ssjnUmIYPghaKbqHl5vmhzNA0LWtO8kyheX20t9WaEil6cQ8i0EpoLdUKMBp6rfcbfC90'

                        }
                    })

                    var mailOptions =  {
                        from:'admin <meanauthorizationapp@gmail.com>', 
                        to:req.body.email, 
                        subject:'Regarding Registeration', 
                        html:'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head></head><body><style></style>Dear customer, You have Successfully registered with our website.You can Login through this link or click on login.<a href="http://192.168.150.108:4200" style="color:#00f">Login</a></body></html>'
}

                    transporter.sendMail(mailOptions, function (err, res) {
                        if (err) {
                            console.log('Error' + err);
                            throw err;
                        }else {
                            console.log('Email Sent'); 
                        }
                    });
                    var accountSid = 'AC14a04503ac839d324237b87f55d84315'; // Your Account SID from www.twilio.com/console
var authToken = 'cb39d23ea20fc922ce5dbb759e966626 '; // Your Auth Token from www.twilio.com/console

                    var twilio = require('twilio'); 
                    var client = new twilio.RestClient(accountSid, authToken); 

                    client.messages.create( {
                        body:'You have successfully registered.', 
                        to:'+91' + req.body.mobile, // Text this number
from:'+1 479-385-0455 '// From a valid Twilio number
}, function (err, message) {
                        console.log("sms sent")
                        console.log(message); 
                    }); 
                }
            })
                    
                }); 
            }); 
            //console.log(newUser.password);
            // newUser.save(function (err, user) {
            //     console.log(newUser.password);
            //     console.log('newUser.password');
            //     if (err) {
            //         throw err;

            //     } else {
            //         res.json({ status: 200, msg: ' register Successfully' });
            //         const nodemailer = require('nodemailer');
            //         const xoauth2 = require('xoauth2');

            //         var transporter = nodemailer.createTransport({
            //             service: 'gmail',
            //             auth: {
            //                 type: 'OAuth2',
            //                 user: 'innobankindia@gmail.com',
            //                 clientId: '648860037400-juj2jjut5f6tnhk322ma9ti1u7pak0q0.apps.googleusercontent.com',
            //                 clientSecret: 'xUHvvlkXTlmWAhenb9K9bpUD',
            //                 refreshToken: '1/YYSzlgJaWjmGl89RuYxneeUzp92Jqd4cNu9NqMCBVOM',
            //                 accessToken: 'ya29.GlsMBAX1weZ1zkP0V3IuIcL2T2LxNyg3n5Of1fp6GLVbjCIY0flHrtZvOKcwc9GB98LglG7ZUSPQ9OTPYxZ77RTJ6P4daTwTOawSgEGirjmBdtB3_UajCukk8Qxk'

            //             }
            //         })

            //         var mailOptions = {
            //             from: 'admin <innobankindia@gmail.com>',
            //             to: req.body.email,
            //             subject: 'Regarding Registeration',
            //             html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head></head><body><style></style>Dear customer, You have Successfully registered with our website.You can Login through this link or click on login.<a href="http://192.168.150.108:4200" style="color:#00f">Login</a></body></html>'
            //         }

            //         transporter.sendMail(mailOptions, function (err, res) {
            //             if (err) {
            //                 console.log('Error' + err);
            //             } else {
            //                 console.log('Email Sent');
            //             }
            //         });
            //         var accountSid = 'AC14a04503ac839d324237b87f55d84315'; // Your Account SID from www.twilio.com/console
            //         var authToken = 'cb39d23ea20fc922ce5dbb759e966626 ';   // Your Auth Token from www.twilio.com/console

            //         var twilio = require('twilio');
            //         var client = new twilio.RestClient(accountSid, authToken);

            //         client.messages.create({
            //             body: 'You have successfully registered.',
            //             to: '+91'+ req.body.mobile,  // Text this number
            //             from: '+1 479-385-0455 ' // From a valid Twilio number
            //         }, function (err, message) {
            //             console.log("sms sent")
            //             console.log(message);
            //         });
            //     }
            // })
        }if (docs[0] != null) {
            res.json( {status:201, msg:'User Already Registered'}); 
        }
    })
}
exports.authenticate = function (req, res) {
    var username = req.body.username; 
    var password = req.body.password; 
    var query =  {username:username }; 
    // var otp=Math.floor(Math.random()*90000) + 100000;
    // console.log(otp);
    connection.findOne(query, function (err, user) {
        //console.log(user); 
//         var bytes = CryptoJS.AES.decrypt(user.password.toString(), 'secret key 123525545254'); 
// var plaintext = bytes.toString(CryptoJS.enc.Utf8); 
 
// console.log(plaintext); 
        if (err) {
            throw err; 
        }
        else if ( ! user) {
            //console.log("else if called"); 
            res.json( {status:404, msg:'User not found'}); 
        }
        else {
            //console.log(user); 
            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err)throw err; 
                else {
                    //console.log(isMatch); 
                    if (isMatch) {
                        var secret = "123456"; 
                        var token = jwt.sign(user, secret,  {
                            expiresIn:604800
                        }); 
                        //console.log(token); 
                        res.json( {status:200, token:'JWT ' + token, user:user }); 
                    }else {
                        //console.log("password is not matched")
                        res.json( {status:201, msg:'User not found'}); 
                    }
                }
            }); 
            // bcrypt.genSalt(11, function (err, salt) {
            //     bcrypt.hash(password, salt, function (err, hash) {
            //          console.log(hash);
            //         if (err) {
            //             throw err;
            //         } else {

            //             connection.findOne({ password: hash }, function (err, isMatch) {
            //                 console.log(isMatch);
            //                 if (err) throw err;
            //                 if (isMatch) {
            //                     var token = jwt.sign(user, connection.secret, {
            //                         expiresIn: 604800
            //                     });
            //                     console.log(token);
            //                     res.json({ success: true, token: 'JWT ' + token });
            //                 } else {
            //                     res.json({ success: false, msg: 'User not found' });
            //                 }
            //             })
            //         }
            //         // Store hash in your password DB. 
            //     });
            // });
        }
    })
}
exports.searchUser = function(req, res) {
    var useremail = req.body.email; 

    var query = connection.aggregate( {$match: {'email': {$ne:useremail}}},  {$project: {name: {$concat:[ "$firstName", " ", "$lastName"] }}}); 
    query.exec(function (err, someValue) {
    	if (err) {
			console.log(err); 
		}
        res.json( {data:someValue, msg:"success"}); 
    }); 
}
exports.usersSearch = function(req, res) {
    var id = req.body.id; 
    console.log(id); 
   // var mail=req.body.email;
    connection.find( {'_id':id}, function(err, docs) {
        if (err) {
            throw err; 
        }else {
            res.json( {status:200, data:docs})
        }
    })
}
exports.allUsers = function(req, res) {
    connection.find(function (err, data) {
        //console.log(data); 
        if (err) {
            throw err; 
        }else {
            res.json( {status:200, data:data})
        }
    })
}
exports.usersProfile = function(req, res) {
    var id = req.params.id; 
    //console.log(id); 
   // var mail=req.body.email;
    connection.find( {'_id':id}, function(err, docs) {
        //console.log(docs); 
        if (err) {
            throw err; 
        }else {
            //console.log(docs); 
            res.json( {status:200, data:docs})
        }
    })
}
exports.generateOTP=function(req,res){
    var email=req.body.email;
    var otp=Math.floor(Math.random()*90000) + 100000;
    console.log(otp);
    connection.find({email:email },function(err,data){
        if(err){
            throw err;
        }else if(data[0]!=null){
             var transporter = nodemailer.createTransport( {
                        service:'gmail', 
                        auth: {
                            type:'OAuth2', 
                            user:'meanauthorizationapp@gmail.com', 
                            clientId:'19607707395-gnntp7qud83f17b64kmam0on3sjhdnte.apps.googleusercontent.com', 
                            clientSecret:'7_0lSsQn_Uj5809p6IZcZ3g9', 
                            refreshToken:'1/qyV4DT7qSEWU4lH3h5MHmXLKvX_NSbY8tBeiq7W1mzs', 
                            accessToken:'ya29.GlsmBOD8kCAmJjJyQEHZYfuuSXJTdQsXhl_jPk444ZL3pxwYqxHV2PrYguRe00sT75eMnKHVLrIsWQx7veHbxptwWjHgWe2RQyh09WY98I9JOIbi-lLWOVzCAHW3'

                        }
                    })

                    var mailOptions =  {
                        from:'admin <meanauthorizationapp@gmail.com>', 
                        to:req.body.email, 
                        subject:'OTP to change password.', 
                        html:'<h3>Dear User,</h3><br>Your OTP is:'+otp+''
}

                    transporter.sendMail(mailOptions, function (err, res) {
                        if (err) {
                            console.log('Error' + err);
                            throw err;
                        }else {
                            console.log('Email Sent'); 
                        }
                    });
            connection.update({email:email},{$set:{otp:otp}},function(err,data){
                if(err){
                    throw err;
                }else{                    
                    res.json({status:200,data:otp});
                }
            })
             
            }else{
                res.json({status:404});
            }
    });
}
exports.checkOtp=function(req,res){
   var otp=req.body.otp;
   //console.log(otp);
   connection.find({otp:otp},function(err,data){
       if(err){
           throw err;
       }else if(data[0]){
           //console.log(data[0]);
        res.json({status:200});
       }else{
           res.json({status:404,msg:'Invalid Otp'});
       }
   })
}
exports.resetPassword=function(req,res){
    var password=req.body.password;
    var email=req.body.email;
    var newPassword;
    //console.log(email);
    //console.log(password);
    bcrypt.genSalt(10, function (err, salt) {
                //console.log('gjuhfgjhgujg');
                bcrypt.hash(password, salt, function (err, hash) {
                    
                    if (err) {
                        throw err; 
                    }else {
                       newPassword=hash;
                       console.log(newPassword);
                        connection.update({email:email},{$set:{password:newPassword}},function(err,data){
                        if(err){
                            throw err;
                        }else{
                            var transporter = nodemailer.createTransport( {
                        service:'gmail', 
                        auth: {
                            type:'OAuth2', 
                            user:'meanauthorizationapp@gmail.com', 
                            clientId:'19607707395-gnntp7qud83f17b64kmam0on3sjhdnte.apps.googleusercontent.com', 
                            clientSecret:'7_0lSsQn_Uj5809p6IZcZ3g9', 
                            refreshToken:'1/qyV4DT7qSEWU4lH3h5MHmXLKvX_NSbY8tBeiq7W1mzs', 
                            accessToken:'ya29.GlsmBOD8kCAmJjJyQEHZYfuuSXJTdQsXhl_jPk444ZL3pxwYqxHV2PrYguRe00sT75eMnKHVLrIsWQx7veHbxptwWjHgWe2RQyh09WY98I9JOIbi-lLWOVzCAHW3'

                        }
                    })

                    var mailOptions =  {
                        from:'admin <meanauthorizationapp@gmail.com>', 
                        to:req.body.email, 
                        subject:'Regarding Password Updation.', 
                        html:'<h3>Dear User,</h3><br>Your Password has been Updated Successfully.You can login With new Password.'
}

                    transporter.sendMail(mailOptions, function (err, res) {
                        if (err) {
                            console.log('Error' + err);
                            throw err;
                        }else {
                            console.log('Email Sent'); 
                        }
                    });
                            //console.log(data);
                            res.json({status:200});
                        }
                    })
                    }
                });
    });
   
}