import { Component, OnInit } from '@angular/core';
import { QuizFetcherService } from 'src/app/services/quiz-fetcher.service';
import { QuizModel, QuestionModel, OptionsModel } from '../../models/QuizPostModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css'],
})
export class CreateQuizComponent implements OnInit {
  step: number;
  newQuiz: QuizModel;
  newQuestion: QuestionModel;
  optionList: OptionsModel[];
  question_txt:string;

  constructor(private qf:QuizFetcherService,
    private router: Router) {}

  ngOnInit(): void {
    this.step = 0;
    this.newQuestion = new QuestionModel("",[]);
    this.optionList = [];
  }

  saveInfo(name: string, date: Date, duration: number, buffer: number) {
    // console.log(name + " " + date + " " + duration + " " + buffer);
    this.newQuiz = new QuizModel(name, date, duration, buffer, []);
    // console.log(this.newQuiz);
    // this.newQuiz.name = name.toString();
    // this.newQuiz.startdate = date;
    // this.newQuiz.duration = duration;
    // this.newQuiz.buffertime = buffer;
    this.step++;
  }

  addQuestion(e, f) {
    //console.log(e);
    // if(this.optionList.length<2)
    //   return;
    // this.newQuiz.questions.push(new QuestionModel(e, this.optionList));
    // this.optionList = [];
    // f.reset();
    // console.log(this.newQuiz);
    // this.step++;
    this.newQuestion.question = e;
    this.newQuestion.options = [];
    this.closemod1();
  }

  addOption(op:string, an:boolean, f) {
    if(op == "")
      return;
    this.optionList.push(new OptionsModel(op,an));
    f.reset();
    // console.log(this.optionList);
  }

  removeOption(item){
    // console.log(item);
    var i:number;
    for(i=0; i<this.optionList.length;i++){
      if(item == this.optionList[i])
        this.optionList.splice(i,1);
    }
  }

  addQuestionToQuiz(){
    if(this.optionList.length>1 && this.newQuestion.question != "" && this.checkNumberOfAnswer())
    {
      this.newQuestion.options = this.optionList;
      this.newQuiz.questions.push(this.newQuestion);
      console.log(this.newQuiz);
      this.newQuestion = new QuestionModel("", []);
      this.optionList = [];
      this.step++;
      alert("Question added");
    }
    else
    {
      alert("Can't add question. Please see question checklist. And make required changes.")
    }
  }

  submitQuiz(){
    var cid = JSON.parse(localStorage.getItem('classinfo'))['class_id'];
    this.qf.createQuiz(cid, this.newQuiz).subscribe( data => {
      if(data['success'])
      {
        alert("Quiz Created");
        this.router.navigateByUrl(`/class/${data['data']['quiz_classid']}/quiz`);
      }
    });
  }

  checkNumberOfAnswer():boolean{
    var i:number;
    var c:number = 0;
    for(i=0; i<this.optionList.length; i++)
      if(this.optionList[i].is_answer)
        c++;

    if(c>0)
      return true;
    else
      return false;
  }

  openQuestion(){
    document.getElementById("mod1").style.display = "block";
  }

  openOption(){
    document.getElementById("mod2").style.display = "block";
  }

  viewQuiz(){
    document.getElementById("mod3").style.display = "block";
  }

  closemod1(){
    document.getElementById("mod1").style.display = "none";
  }

  closemod2(){
    document.getElementById("mod2").style.display = "none";
  }

  closemod3(){
    document.getElementById("mod3").style.display = "none";

  }
}

