import { Component, OnInit } from '@angular/core';
import { BackendAuthService } from 'src/app/services/backend-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: BackendAuthService) { }

  user;

  ngOnInit(): void {
    this.user = this.auth.userInfo;
    console.log(this.user);
  }

}
