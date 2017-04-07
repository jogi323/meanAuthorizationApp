import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { Router } from "@angular/router";
import {FlashMessagesService}from 'angular2-flash-messages'; 
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
user:resetPasswordData;
data;
email;
data1;
check; 
  constructor(private RpService:AppService,private router:Router,private flashMessages:FlashMessagesService) {
    this.user={
      password:'',
      cnfpassword:''
    }
   }
resetPassword(user){
  //console.log(user);
  if(this.user.password===this.user.cnfpassword){
    console.log(this.RpService.mail);
     this.data=this.RpService.mail;
     console.log(this.data);
     user.email=this.data['email'];
     console.log(user.email);
    this.RpService.url="users/resetPassword";
    this.RpService.data=user;
    console.log(this.RpService.data);
    this.RpService.postService().subscribe(res=>{
      console.log(res);
      this.data1=res['_body'];
      this.check=JSON.parse(this.data1);
      if(this.check['status']==200){
        this.flashMessages.show("Password updated.",  {cssClass:'alert-success', timeout:3000})
        this.router.navigate(['']);
      }else{
        this.flashMessages.show("Failed to update password.",  {cssClass:'alert-danger', timeout:3000})
      }
    })
  }else{
    this.flashMessages.show('password and Confirm passwords must be equal.',{cssClass:'alert-danger', timeout:3000})
  }
}
  ngOnInit() {
  }

}
export class resetPasswordData{
  password:String;
  cnfpassword:String;
}