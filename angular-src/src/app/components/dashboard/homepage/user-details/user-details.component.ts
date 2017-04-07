import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../../app.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
userDetails;
  constructor(private UserDetailsService:AppService) { }

  ngOnInit() {
   this.userDetails=this.UserDetailsService.userdata;
  }

}
