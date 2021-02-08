import { Component, OnInit } from '@angular/core';
import { AttendanceFetcherService } from '../services/attendance-fetcher.service';

@Component({
  selector: 'app-listattendance2',
  templateUrl: './listattendance2.component.html',
  styleUrls: ['./listattendance2.component.css']
})
export class Listattendance2Component implements OnInit {

  constructor(private attend: AttendanceFetcherService) { }

  sids : String[];
  ainfo : any;


  ngOnInit(): void {
    let c = JSON.parse( localStorage.getItem('classinfo'))
  
    
    this.attend.getClassAttend(c["class_id"]).subscribe(data=>{
      if(data['success']) {
        this.ainfo = data ['data']
      }

    })
   
  }
CreateAttend(attend){
  let userinfo = JSON.parse(localStorage.getItem('user'));

  let classinfo = JSON.parse(localStorage.getItem('classinfo'));

  this.attend.CreateAttend(userinfo["userid"], classinfo["class_id"], attend).subscribe(data => {
    if (data["data"]) {
      alert("Attendance Created");
    }
    location.reload();
  })

}
  
}
