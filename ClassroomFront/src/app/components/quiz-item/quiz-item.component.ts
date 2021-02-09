import { Component, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';
import { MainQuizModel } from 'src/app/models/QuizPostModel';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.css']
})
export class QuizItemComponent implements OnInit {
  @Input() quiz:MainQuizModel;

  time:string;

  constructor() { }

  ngOnInit(): void {
    //console.log("Quiz Item = > " + this.quiz);
    var t = new Date(this.quiz.quiz_start_datetime);
    var c = new Date();
    var d = t.getTime()-c.getTime();
    d=d/1000;
    var d1= d + (this.quiz.quiz_duration*60);
    interval(1000).subscribe(()=>{
      if(d>0)
      {
        var days = Math.floor(d/86400);
        var hours = Math.floor((d/3600)%24);
        var minutes = Math.floor((d/60)%60);
        var seconds = Math.floor(d%60);
        this.time = `Starts in => ${days > 9 ? days : "0" + days} : ${hours > 9 ? hours : "0" + hours} : ${minutes > 9 ? minutes : "0" + minutes} : ${seconds > 9 ? seconds : "0"+seconds}`;
        d--;
        d1--;
      }
      else if(d1>0){
        var hours = Math.floor((d1/3600)%24);
        var minutes = Math.floor((d1/60)%60);
        var seconds = Math.floor(d1%60);
        this.time = `Ends in => ${hours > 9 ? hours : "0" + hours} : ${minutes > 9 ? minutes : "0" + minutes} : ${seconds > 9 ? seconds : "0"+seconds}`;
        d1--;
      }
      else{
        this.time = "Ended";
      }

    });
  }

}
