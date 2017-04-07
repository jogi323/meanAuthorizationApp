import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { Router } from "@angular/router";
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: LogIn;
  data: any;
 
  constructor(private LoginService: AppService, private router: Router,private flashMessages: FlashMessagesService) {
    this.user = {
      username: '',
      password: ''
    }
  }
  loginuser(user) {
    this.LoginService.data = user;
    this.LoginService.url = "users/login";
    this.LoginService.postService().subscribe(res => {
      // console.log(res);
      this.data=res["_body"];
      //  console.log(this.data);
       var msg=JSON.parse(this.data);
      //  console.log(msg.status);
       if(msg.status==200){
         //console.log('logged in');
         this.LoginService.storeUserdata(msg.token,msg.user);
          // this.flashMessages.show("LoggedIn Successfully",{cssClass:'alert-success',timeout:3000});
        //  console.log("LoggedIn Successfully");
         this.router.navigate(['dashboard/home/usersdata']);
        // console.log('logged in');
       }else if(msg.status==201){
         this.flashMessages.show("Invalid Credentials.",{cssClass:'alert-danger',timeout:3000});
         //console.log("Invalid Credentials.")
          this.router.navigate(['']);
       }else if(msg.status==404){
         this.flashMessages.show("User is not registered yet.",{cssClass:'alert-warning',timeout:3000});
        // console.log("User is not registered yet.")
          this.router.navigate(['']);
       }

    })
  }
 
 ngOnInit() {
    this.data = {name:'',password:""};
      if(localStorage.getItem("user") != null && localStorage.getItem("user") !=''){
        this.router.navigate(['dashboard/home']); 
      }else{
          this.data = {name:'',password:""};
      }
  }

}

export class LogIn {
  username: String;
  password: String;
}