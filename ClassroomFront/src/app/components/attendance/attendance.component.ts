import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  take(){
    document.getElementById('mod1').style.display = "block";
  }
  closemod1(){
    document.getElementById('mod1').style.display = "none";
  }

}
