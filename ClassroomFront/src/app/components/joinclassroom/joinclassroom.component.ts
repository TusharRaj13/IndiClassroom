import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-joinclassroom',
  templateUrl: './joinclassroom.component.html',
  styleUrls: ['./joinclassroom.component.css']
})
export class JoinclassroomComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  joinClassroom(name){
    console.log(name);
  }
}
