import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-noticeboard',
  templateUrl: './noticeboard.component.html',
  styleUrls: ['./noticeboard.component.css']
})
export class NoticeboardComponent implements OnInit {
  is_teacher: boolean;
  notices : any[];

  
  constructor() { }

  ngOnInit(): void {
  }

}
