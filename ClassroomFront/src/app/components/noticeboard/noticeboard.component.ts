import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticeFetcherService } from 'src/app/services/notice-fetcher.service';

@Component({
  selector: 'app-noticeboard',
  templateUrl: './noticeboard.component.html',
  styleUrls: ['./noticeboard.component.css'],
})
export class NoticeboardComponent implements OnInit {
  is_teacher: boolean;
  notices: any[];
  classid: string;

  constructor(private router: ActivatedRoute,
    private noticeFetcher:NoticeFetcherService) {}

  ngOnInit(): void {
    let userinfo = JSON.parse(localStorage.getItem('user'));
    let classinfo = JSON.parse(localStorage.getItem('classinfo'));
    //Working datetime sort
    /*let arr = [
      { id: 1, date: 'Mar 12 2012 10:00:00 AM' },
      { id: 2, date: 'Mar 8 2012 08:00:00 AM' },
      { id: 3, date: 'Mar 9 2012 08:00:00 PM'},
      { id: 4, date: 'Mar 9 2012 08:08:00 AM'},
      { id: 5, date: 'Mar 9 2012 06:08:00 AM'},
    ];
    alert(JSON.stringify(arr));
    arr.sort(function (a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return +c - +d;
    });
    alert(JSON.stringify(arr));*/

    this.router.params.subscribe((params) => {
      this.classid = params['id'];
      classinfo['class_teacher'].forEach((element) => {
        //console.log(element);
        if (element['userid'] == userinfo['googleId']) {
          console.log(element);
          this.is_teacher = true;
        }
      });
      this.noticeFetcher.getClassNotice(this.classid).subscribe(
        data => {
          if(data['success'])
          {
            this.notices = data['data'];
          }
          else
          {
            alert(data['msg']);
          }
        }
      )
      console.log(this.classid);
    });
  }

  createNotice(){
    document.getElementById('mod1').style.display = "block";
  }

  closemod1(){
    document.getElementById('mod1').style.display = "none";
  }
}
