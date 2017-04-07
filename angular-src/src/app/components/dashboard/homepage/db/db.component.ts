import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../../app.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.css']
})
export class DbComponent implements OnInit {
usersdata:any[];
email:string;
userdetails:any[]
  constructor(private usersService:AppService,private router:Router) {
    
   }
userDetails(user){
    this.usersService.userdata=user;
  //console.log(this.usersService.userdata);
  this.router.navigate(['dashboard/home/userdetails']);
}
  ngOnInit() {
    this.usersService.url="users/usersdata";
    this.usersService.getService().subscribe(res=>{
      //console.log(res);
    //console.log(res.json());
    var data = (res.json())["data"];
    this.usersdata = data.sort(function (a, b) {
  var nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
  var nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});
    //console.log(this.usersdata);
    })
  }

}