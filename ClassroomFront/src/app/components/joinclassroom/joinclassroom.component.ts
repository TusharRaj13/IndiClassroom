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
          let userinfo = JSON.parse(localStorage.getItem('user'));
          userinfo["classes"].push({ class_id: data['data']['class_id'], class_name: data['data']['class_name'], class_subject: data['data']['class_subject'], is_teacher: false });
          localStorage.setItem('user', JSON.stringify(userinfo));
          console.log(userinfo);
          location.reload();
        }
        else
        {
          alert(data['msg']);
        }
      }
    )

  }
}
