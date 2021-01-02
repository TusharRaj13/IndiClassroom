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
  classinfo:any;

  constructor(private classroom:ClassroomFetcherService,
    private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      console.log(params["id"]);
      this.classid = params["id"];
    });

    this.classroom.getClassroomInfo(this.classid).subscribe(
      data => {
        if(data['success']){
          console.log(data['data']);
          localStorage.setItem('classinfo', JSON.stringify(data['data']));
        }
        else
        {
          console.log(data['msg']);
        }
      }
    );

    this.classinfo=JSON.parse(localStorage.getItem('classinfo'));
  }

  ngOnDestroy(): void{
    localStorage.removeItem('classinfo');
  }

}
