import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../app.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
usersdata:any[];
  constructor(private usersService:AppService) {
    
   }

  ngOnInit() {
//     this.usersService.url="http://localhost:3000/users/usersdata";
//     this.usersService.getService().subscribe(res=>{
//     console.log(res.json());
//     var data = (res.json())["data"];
//     this.usersdata = data.sort(function (a, b) {
//   var nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
//   var nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
//   if (nameA < nameB) {
//     return -1;
//   }
//   if (nameA > nameB) {
//     return 1;
//   }

//   // names must be equal
//   return 0;
// });
//     console.log(this.usersdata);
//     })
  }

}
