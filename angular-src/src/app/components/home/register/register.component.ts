import {Component, OnInit }from '@angular/core'; 
import {AppService }from '../../../app.service'; 
import {Router }from "@angular/router"; 
import {FlashMessagesService}from 'angular2-flash-messages'; 
@Component( {
selector:'app-register', 
templateUrl:'./register.component.html', 
styleUrls:['./register.component.css']
})
export class RegisterComponent implements OnInit {
user:register; 
data:any; 
constructor(private RegisterService:AppService, private router:Router, private flashMessages:FlashMessagesService) {
this.user =  {
firstname:"", 
lastname:"", 
username:"", 
email:"", 
mobile:undefined, 
password:"", 
gender:"",
image:'',
empId:'',
dob:''
}
}
fileChange($event):void {
this.readThis($event.target); 

}

readThis(inputValue:any):void {
var totalLength = inputValue.files; 
for (var i = 0; i < totalLength.length; i++) {
var file:File = inputValue.files[i]; 
console.log(file); 
var myReader:FileReader = new FileReader(); 
myReader.onloadend = (e) =>  {
this.user.image = myReader.result; 
console.log(this.data); 
}
myReader.readAsDataURL(file); 
}
}
registeruser(user) {
this.RegisterService.data = user; 
this.RegisterService.url = "http://localhost:8080/users/register";
this.RegisterService.postService().subscribe(res =>  {
console.log(res); 
this.data = res["_body"]; 
console.log(this.data); 
var msg = JSON.parse(this.data); 
console.log(msg.status); 
if (msg.status == 200) {
this.flashMessages.show("registered Successfully",  {cssClass:'alert-success', timeout:5000}); 
console.log("registered Successfully"); 
this.router.navigate(['']); 
}else if (msg.status == 201) {
this.flashMessages.show("User already Registered",  {cssClass:'alert-danger', timeout:5000}); 
this.router.navigate(['']); 
}
else {
this.flashMessages.show("User Not Registered",  {cssClass:'alert-danger', timeout:5000}); 
this.router.navigate(['register']); 
}
})
}
ngOnInit() {
}

}
export class register {
firstname:String; 
lastname:String; 
username:String; 
email:String; 
mobile:Number; 
password:String; 
gender:String; 
image:any;
empId:String;
dob:String
}
