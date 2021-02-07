import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { AnswerModel, MainQuestionModel, MainQuizModel } from 'src/app/models/QuizPostModel';
import { QuizFetcherService } from 'src/app/services/quiz-fetcher.service';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css'],
})
export class TakeQuizComponent implements OnInit {
  quizinfo: MainQuizModel;// = new MainQuizModel("","","",new Date(),0,[]);
  quizid: string;
  time: string;
  timer:string;
  quiz_timer:string;
  quiz_started:boolean = false;
  question_list:MainQuestionModel[] = [];
  answer_list:AnswerModel[] = [];
  i:number;
  constructor(private router: ActivatedRoute, private qf: QuizFetcherService) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      console.log(params['qid']);
      this.quizid = params['qid'];

    });
    this.qf.getQuiz(this.quizid).subscribe((data) => {
      if (data['success']) {
        this.quizinfo = data['data'];
        this.startQuiz();
        // this.quizinfo = data['data'];
        // console.log(this.quizinfo);
        // var t = new Date(this.quizinfo.quiz_start_datetime);
        // var c = new Date();
        // var d = t.getTime() - c.getTime();
        // d = d / 1000;
        // //console.log('Done');
        // var d1 = d + this.quizinfo.quiz_duration * 60;
        // if(d<=0){
        //   this.startQuiz();
        //   return;
        // }
        // interval(1000).subscribe(() => {
        //   if (d > 0) {
        //     var days = Math.floor(d / 86400);
        //     var hours = Math.floor((d / 3600) % 24);
        //     var minutes = Math.floor((d / 60) % 60);
        //     var seconds = Math.floor(d % 60);
        //     this.time = `Quiz Auto starts in => ${days > 9 ? days : '0' + days} : ${
        //       hours > 9 ? hours : '0' + hours
        //     } : ${minutes > 9 ? minutes : '0' + minutes} : ${
        //       seconds > 9 ? seconds : '0' + seconds
        //     }`;
        //     d--;
        //     d1--;
        //     if(d==0){
        //       this.startQuiz();
        //     }
        //   } else if (d1 > 0) {
        //     var hours = Math.floor((d1 / 3600) % 24);
        //     var minutes = Math.floor((d1 / 60) % 60);
        //     var seconds = Math.floor(d1 % 60);
        //     this.time = `Quiz Ends in => ${hours > 9 ? hours : '0' + hours} : ${
        //       minutes > 9 ? minutes : '0' + minutes
        //     } : ${seconds > 9 ? seconds : '0' + seconds}`;
        //     // this.time = "Quiz Started";
        //     d1--;
        //   } else {
        //     this.time = 'Quiz Ended';
        //   }

        // });
      }
    });
  }

  startQuiz(){
    //console.log(this.quizinfo);
    this.quiz_started = true;
    this.question_list = this.randomizeQuestions(this.quizinfo.quiz_questions);
    this.question_list = this.randomizeOptions(this.question_list);
    this.question_list.forEach(element => {
      this.answer_list.push(new AnswerModel(element.question_id, []));
    });
    console.log(this.answer_list);
    this.i=0;
    var c = new Date();
    var t = new Date(this.quizinfo.quiz_start_datetime);
    // console.log(t);
    var tot = t.getTime() + ((this.quizinfo.quiz_duration + this.quizinfo.quiz_buffer_time)*60*1000);
    // console.log(tot + " " + t.getTime());
    if(tot - t.getTime() >= (this.quizinfo.quiz_duration + this.quizinfo.quiz_buffer_time)*60000)
      this.setTimer(this.quizinfo.quiz_duration*60);
    else
      this.setTimer((tot - c.getTime())/1000);
  }

  endQuiz(){

  }

  setTimer(n:number){
    interval(1000).subscribe(() => {
      var hours = Math.floor((n / 3600) % 24);
      var minutes = Math.floor((n / 60) % 60);
      var seconds = Math.floor(n % 60);
      this.timer = `Quiz Ends in => ${hours > 9 ? hours : '0' + hours} : ${
        minutes > 9 ? minutes : '0' + minutes
      } : ${seconds > 9 ? seconds : '0' + seconds}`;
      n--;
      if(n==0){
        this.autoSubmit();
      }
    });
  }

  nextQues(){
    if(this.i < (this.question_list.length-1))
    {
      //this.resetRadio();
      this.i=this.i+1;

    }

    // console.log(this.i);
  }

  prevQues(){
    if(this.i>0)
    {
      //this.resetRadio();
      this.i=this.i-1;

    }
  }

  setAnswer(q,a){
    //console.log(q + " " + a);
    // if(this.answer_list.length < this.i+1){
    //   this.answer_list.push(new AnswerModel(q, [a]));
    // }
    // else{
    //   this.answer_list[this.i] = new AnswerModel(q, [a]);
    // }
    this.answer_list.forEach(element => {
      if(element.question_id == q)
      {
        element.answer_ids = [a];
        //console.log(element);
      }
    });
    //console.log(this.answer_list);
  }

  resetRadio(q,o){
    console.log(q + " " + o);
    if(this.answer_list.length == 0)
      return false;
    this.answer_list.forEach(element => {
      if(element.question_id == q)
      {
        element.answer_ids.forEach(element1 => {
          if(element1 == o)
            return true;
        })
      }
    });
    return false;
    //var l = document.getElementsByName("ans");
    // var sq = this.question_list[this.i].question_id;
    // this.answer_list.forEach(element => {
    //   if(sq == element.question_id){
    //     if(element.answer_ids.length>0)
    //     {
    //       // console.log("#"+element.answer_ids[0]);
    //       // var isq = document.getElementById(element.answer_ids[0]);
    //       // //$("#"+element.answer_ids[0]).click();
    //       // console.log($("#"+element.answer_ids[0]));
    //       // $("#"+element.answer_ids[0]).prop("checked", true);
    //       // $("input[name='ans']").each(function(index){
    //       //   console.log($(this).attr('id'));
    //       //   if($(this).attr('id') == element.answer_ids[0]){
    //       //     console.log("ID=" + $(this).attr('id'));
    //       //     $(this).attr("checked", true);
    //       //   }
    //       // })
    //     }
    //   }
    // })


  }

  autoSubmit(){

  }

  submitQuiz(){
    document.getElementById("dialog1").style.display = "block";
  }

  closedialog1(){
    document.getElementById("dialog1").style.display = "none";
  }

  randomizeQuestions(array:MainQuestionModel[]){
    let curId = array.length;
    while(0 !== curId){
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  }
  randomizeOptions(array:MainQuestionModel[]){
    for(let q of array)
    {
      let curId = q.question_options.length;
      while(0 !== curId){
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        let tmp = q.question_options[curId];
        q.question_options[curId] = q.question_options[randId];
        q.question_options[randId] = tmp;
      }
    }
    return array;
  }
}
