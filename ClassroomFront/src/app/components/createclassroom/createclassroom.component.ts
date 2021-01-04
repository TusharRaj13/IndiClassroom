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
        }
      }
    );
  }

}
