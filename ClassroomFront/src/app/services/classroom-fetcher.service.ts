import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassroomFetcherService {

  constructor(private http:HttpClient) { }

  getClassroomInfo(classid:string){
    return this.http.get('http://localhost:3000/api/get_classroom/'+classid);
  }

}
