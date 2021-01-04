import { Component, OnInit } from '@angular/core';
import { ClassroomFetcherService } from 'src/app/services/classroom-fetcher.service';

@Component({
  selector: 'app-joinclassroom',
  templateUrl: './joinclassroom.component.html',
  styleUrls: ['./joinclassroom.component.css']
})
export class JoinclassroomComponent implements OnInit {

  constructor(private classroomService: ClassroomFetcherService) { }

  ngOnInit(): void {
  }
  joinClassroom(code){
    console.log(code);
    let userinfo = JSON.parse(localStorage.getItem('user'));
    this.classroomService.joinClassroom(code, userinfo["googleId"], userinfo["username"], userinfo["imageUrl"]).subscribe(
      data => {
        if(data['success']){
          alert(data['msg']);
        }
        else
        {
          alert(data['msg']);
        }
      }
    )

  }
}
