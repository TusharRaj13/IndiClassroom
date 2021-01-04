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

  createClassroom(googleid:string, username:string, userimage:string, name:string, subject: string){
    let body= { 'userid': googleid, 'username': username, 'userimage': userimage, 'name': name, 'subject': subject};
    let headers = {headers:{'Content-Type': 'application/json'}};
    return this.http.post('http://localhost:3000/api/create_classroom', body, headers);
  }

  joinClassroom(code:string, googleid:string, username:string, userimage:string){
    let body= { 'userid': googleid, 'username': username, 'userimage': userimage };
    let headers = {headers:{'Content-Type': 'application/json'}};
    return this.http.post(`http://localhost:3000/api/join_invitecode/${code}`, body, headers);
  }

}
