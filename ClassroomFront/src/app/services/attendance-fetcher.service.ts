import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AttendanceFetcherService {

  constructor(private http:HttpClient) { }


  getClassAttend(classid : string){

    return this.http.get(`http://localhost:3000/api/get_attendance/${classid}`);
  }

  createAttendance(classid: String, sheets: String[]) {
    let body = { 'date': new Date(), 'data': sheets };
    let headers = {headers:{'Content-Type': 'application/json'}};
    return this.http.post(`http://localhost:3000/api/create_attendance/${classid}`, body, headers);
    
  }
}

