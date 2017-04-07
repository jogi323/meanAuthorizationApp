import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../app.service';
@Component({
  selector: 'app-searched-user',
  templateUrl: './searched-user.component.html',
  styleUrls: ['./searched-user.component.css']
})
export class SearchedUserComponent implements OnInit {
user;
  constructor(private SearchedService:AppService) { }

  ngOnInit() {
    //console.log("hai");
    this.user=this.SearchedService.userData;
    this.SearchedService.caseNumber$.subscribe(res=>{
      this.user=res;
      //console.log(res);
      
    })
  }

}
