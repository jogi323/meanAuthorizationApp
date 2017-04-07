import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { Router } from "@angular/router";
import {FlashMessagesService}from 'angular2-flash-messages'; 
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
user:fpInterface;
data:any;
data1:any;
otp:Number;
isTrue:Boolean=false;
check:any;

  constructor(private FpService:AppService,private router:Router,private flashMessages:FlashMessagesService) {
    this.user={
      otp:undefined,
      email:'',
      isTrue:undefined
    }
   }
   // To generate OTP
generateOtp(user){
  if(!this.isTrue){
  this.FpService.url="users/generateOtp";
  this.FpService.data=user;
  this.FpService.postService().subscribe(res=>{
    console.log(res);
    this.data=res['_body'];
    console.log(this.data);
    this.otp=JSON.parse(this.data);
    console.log(this.otp);
    if(this.otp['status']==200){
        this.isTrue=true;
    }else if(this.otp['status']==404){
      this.flashMessages.show("Invalid Email-Id",  {cssClass:'alert-danger', timeout:3000})
    }
  })
}
//To check OTP
else if(this.isTrue){
  this.FpService.url="users/checkOtp";
  this.FpService.data=user;
  console.log(user['email']);
  this.FpService.postService().subscribe(res=>{
  console.log(res);
  this.data1=res['_body'];
  this.check=JSON.parse(this.data1);
  console.log(this.check);
  if(this.check['status']==200){
    this.router.navigate(['resetpassword']);
    this.FpService.mail=user;
    console.log(this.FpService.mail);
  }if(this.check['status']==404){
    this.flashMessages.show("You have entered wrong otp.",  {cssClass:'alert-danger', timeout:3000})
  }
  })
}
}
resendOtp(user){
  this.FpService.url="users/generateOtp";
  this.FpService.data=user;
  this.FpService.postService().subscribe(res=>{
    console.log(res);
  })
}
  ngOnInit() {
  }

}
export class fpInterface{
  otp:Number;
  email:String;
  isTrue:Boolean;
}