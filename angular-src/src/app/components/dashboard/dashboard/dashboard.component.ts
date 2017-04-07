import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../profile/profile.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService:ProfileService) {

   }

  ngOnInit() {
  }

}
