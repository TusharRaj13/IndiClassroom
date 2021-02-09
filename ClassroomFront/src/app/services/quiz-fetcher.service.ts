import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuizModel, AnswerModel } from '../models/QuizPostModel';

@Injectable({
  providedIn: 'root'
})
export class QuizFetcherService {

  constructor(private http: HttpClient) { }

  createQuiz(classid:string, data:QuizModel){
    let body = { 'class_id': classid, 'data':data };
    let headers = {headers:{'Content-Type': 'application/json'}};
    return this.http.post(`http://localhost:3000/api/create_quiz`, body, headers);
  }

  getQuizByClass(classid:string){
    return this.http.get(`http://localhost:3000/api/get_class_quiz/${classid}`);
  }

  getQuiz(id:string){
    return this.http.get(`http://localhost:3000/api/get_quiz/${id}`);
  }

  submitReponse(data:AnswerModel[], quizid:string, score:string){
    var userInfo = JSON.parse(localStorage.getItem('user'));
    let body = { 'quiz_id': quizid, 'student_id': userInfo['googleId'], 'question_resp': data, 'quiz_score': score + "/" + data.length};
    let headers = {headers:{'Content-Type':'application/json'}};
    return this.http.post('http://localhost:3000/api/submit_response', body, headers);
  }

  getStudentResponses(quizid:string, student_id:string){
    
    let body = { 'quiz_id': quizid, 'student_id': student_id};
    console.log("bodyyy => " + quizid + " " + student_id);
    let headers = {headers:{'Content-Type': 'application/json'}};
    return this.http.post('http://localhost:3000/api/get_student_response',body, headers);
  }

  getClassResponses(quizid:string){
    return this.http.get(`http://localhost:3000/api/get_students_responses/${quizid}`);
  }
}
