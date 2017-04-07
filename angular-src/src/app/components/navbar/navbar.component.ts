import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';
//import {FlashMessagesService} from 'angular2-flash-messages';
import { Typeahead } from 'ng2-typeahead';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
data:any;
selected:any;
name:string;
dataObj:any[];
userData;
find;
dataObj2:any[];
  constructor(private LogoutService: AppService,private FinduserService: AppService,private _msg:FlashMessagesService, private router: Router) { 
    this.data={
      email:''
    }
  }

  ngOnInit() {
    var email=JSON.parse(localStorage.getItem('user'));
    //console.log(email);
    //console.log(email['email']);
    this.FinduserService.data={"email":email['email']};
    this.FinduserService.url="users/search";
    this.FinduserService.postService().subscribe(res=>{this.data=res.json()
      //console.log(this.data)
      this.selected ='' ;
      
      //console.log(this.selected);
      this.dataObj=this.data['data'];
      //console.log(this.dataObj);
      //this.FinduserService.userdata=this.dataObj;
    })
  }
  logoutUser() {
    this.LogoutService.logout();
    this.router.navigate(['']);
    return false;
  }
 public userSelected(selected) {
    this.selected =selected;
    //console.log(selected);
    //console.log("hai");
    this.name = selected ? selected.name : 'none';

  }
  findUser(){
  this.dataObj2 =  (this.dataObj).filter(selected =>{
    return selected.name == this.name
  });
  // this.FinduserService.userdet=this.dataObj2;
  // console.log(this.FinduserService.userdet);
  //console.log('1st time');
    //console.log(this.dataObj2[0]);
   
if(this.dataObj2[0]){
   this.FinduserService.data={"id":this.dataObj2[0]._id};
    this.FinduserService.url='users/searchuser';
    this.FinduserService.postService().subscribe(res=>{
       //console.log('2nd time');
     //console.log(res);
      this.userData=res.json();
       //console.log(this.userData);
      this.find=this.userData['data'][0];
      //console.log(this.find);
      this.FinduserService.userData = this.find;
     this.FinduserService.publishData(this.find);
      if(this.find){
       
        this.router.navigate(['dashboard/searcheduser']);
      }else if(this.find ==''){
       
        this.router.navigate(['dashboard/home']);
      }
    })
  }else{
    // alert('Enter Correct Name of User.');
    this._msg.show("User doesn't exist",{cssClass:'alert-danger',timeout:2000})
    this.router.navigate(['dashboard/home/usersdata']);
  }
  }
}
