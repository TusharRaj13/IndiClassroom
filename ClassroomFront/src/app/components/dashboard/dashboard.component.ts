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

  createClass(){
    document.getElementById("mod1").style.display = "block";
    //document.getElementById("body").style.filter="saturate(250%) blur(25px)";
  }

  joinClass(){
    document.getElementById("mod2").style.display = "block";
    //document.getElementById("body").style.filter="saturate(250%) blur(25px)";
  }

  closemod1(){
    document.getElementById("mod1").style.display="None";
    //document.getElementById("body").style.filter="blur(0px)";
  }

  closemod2(){
    document.getElementById("mod2").style.display="None";
    //document.getElementById("body").style.filter="blur(0px)";
  }

}
