import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createclassroom',
  templateUrl: './createclassroom.component.html',
  styleUrls: ['./createclassroom.component.css']
})
export class CreateclassroomComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  addClassroom(name, subject){
    console.log(name + " " + subject);
  }

}
