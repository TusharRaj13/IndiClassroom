import { Component, OnInit } from '@angular/core';
import { BackendAuthService } from 'src/app/services/backend-auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: BackendAuthService,
    private ts: Title) { }

  user:any;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    //console.log('test' +  this.user);
    this.ts.setTitle('Dashboard - IndiClassroom');
  }

}
