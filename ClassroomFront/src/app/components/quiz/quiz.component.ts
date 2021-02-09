import { Component, OnInit } from '@angular/core';
import { QuizModel } from 'src/app/models/QuizPostModel';
import { QuizFetcherService } from 'src/app/services/quiz-fetcher.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  upcomingquiz: QuizModel[] = [];
  ongoingquiz: QuizModel[] = [];
  endedquiz:QuizModel[] = [];

  constructor(private qf:QuizFetcherService) { }

  ngOnInit(): void {
    var cid = JSON.parse(localStorage.getItem('classinfo'))['class_id'];
    this.qf.getQuizByClass(cid).subscribe(data => {
      if(data['success'])
      {
        for(var q of data['data'])
        {
          var t = new Date(q['quiz_start_datetime']);

          var c = new Date();
          var d = t.getTime()-c.getTime();
          d=d/1000;
          var d1 = d + (q['quiz_duration']*60);
          // console.log(d + " " + d1)
          if(d>0 && d1>0){
            this.upcomingquiz.push(q);
          }
          else if(d<0 && d1>0){
            this.ongoingquiz.push(q);
          }
          else{
            this.endedquiz.push(q);
          }
          // console.log(d/1000);
          // var time = `${Math.floor(d/86400)} : ${Math.floor((d/3600)%24)} : ${Math.floor((d/60)%60)} : ${Math.floor(d%60)}`;
          // console.log(time);
        }
      }
    })
  }

}
