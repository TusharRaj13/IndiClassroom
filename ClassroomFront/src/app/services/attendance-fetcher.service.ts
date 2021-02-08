import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AttendanceFetcherService {

  constructor(private http:HttpClient) { }

  CreateAttend(attend_id:string , attend_date:Date ,attend_list:string){
    let body = {'userid':attend_id,'date':attend_date,'list':attend_list};

    let headers = {headers:{'Content-Type':'application/json'}};
    return this.http.post(`http://localhost:3000/api/create_attendance`,body, headers);
  }

  getClassAttend(classid : string){

    return this.http.get(`http://localhost:3000/api/get_attendance/${classid}`);
  }
  

}


