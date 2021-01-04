import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassroomFetcherService } from '../../services/classroom-fetcher.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {

  classid:string;
  infoloaded:boolean = false;
  classinfo = { class_teacher: [], class_students: [] };

  constructor(private classroom:ClassroomFetcherService,
    private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      console.log(params["id"]);
      this.classid = params["id"];
    });
    if(localStorage.getItem('classinfo')!= null)
    {
      if(JSON.parse(localStorage.getItem('classinfo'))["class_id"] == this.classid){
        this.infoloaded = true;
      }
      else
      {
        this.loadClassroom();
      }
    }else{
      this.loadClassroom();
    }
  }

  loadClassroom(){
    this.classroom.getClassroomInfo(this.classid).subscribe(
      data => {
        if(data['success']){
          //console.log(data['data']);
          localStorage.setItem('classinfo', JSON.stringify(data['data']));
          this.classinfo=JSON.parse(localStorage.getItem('classinfo'));
          this.infoloaded = true;
        }
        else
        {
          alert(data['msg']);
        }
      }
    );
  }

  /*ngOnDestroy(): void{
    localStorage.removeItem('classinfo');
  }*/

}
