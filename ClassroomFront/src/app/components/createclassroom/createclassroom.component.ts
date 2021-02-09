import { Component, OnInit } from '@angular/core';
import { ClassroomFetcherService } from 'src/app/services/classroom-fetcher.service';

@Component({
  selector: 'app-createclassroom',
  templateUrl: './createclassroom.component.html',
  styleUrls: ['./createclassroom.component.css']
})
export class CreateclassroomComponent implements OnInit {


  constructor(private classroomservice:ClassroomFetcherService) { }

  ngOnInit(): void {
  }

  addClassroom(name, subject){
    console.log(name + " " + subject);
    let userinfo = JSON.parse(localStorage.getItem('user'));
    this.classroomservice.createClassroom(userinfo["googleId"], userinfo["username"], userinfo["imageUrl"], name, subject).subscribe(
      data => {
        if(data['success'])
        {
          alert('Classroom created');
          let userinfo = JSON.parse(localStorage.getItem('user'));
          userinfo["classes"].push({ class_id: data['data']['class_id'], class_name: data['data']['class_name'], class_subject: data['data']['class_subject'], is_teacher: true });
          localStorage.setItem('user', JSON.stringify(userinfo));
          console.log(userinfo);
          location.reload();
        }
      }
    );
  }

}
