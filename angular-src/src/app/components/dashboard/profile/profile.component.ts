import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import {AppService} from '../../../app.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user;
data;
id;
  constructor(private profileService:ProfileService,private AppService:AppService) {
   }

  ngOnInit() {
   var headers;
    //this.profileService.loadToken();
    var email=JSON.parse(localStorage.getItem('user'));
      this.id=email['_id'];
    //console.log(this.id);
    this.AppService.data={'id':this.id};
    this.AppService.url='users/searchuser';
    //console.log(this.AppService.url);
    //this.profileService.data={"id":email['_id']};
    this.AppService.postService().subscribe(res=>{
       //console.log(res);
       this.data=res.json();
       //console.log(this.data['data']);
             this.user=this.data["data"][0];
      //console.log(this.user);
      //this.user=res.user;
    })
  }

}
