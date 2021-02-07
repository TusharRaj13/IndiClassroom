import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuizModel } from '../models/QuizPostModel';

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
}
