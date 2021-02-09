import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listattendance',
  templateUrl: './listattendance.component.html',
  styleUrls: ['./listattendance.component.css']
})
export class ListattendanceComponent implements OnInit {
  classInfo;
  constructor() { }

  ngOnInit(): void {
    this.classInfo=JSON.parse(localStorage.getItem("classinfo"));
    
  }

}
