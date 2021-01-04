import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticeFetcherService {

  constructor(private http:HttpClient) { }

  createNotice(googleid:string, classid:string, text:string, date:any){
    console.log(date);
    let body = { 'userid': googleid, 'classid': classid, 'text': text, 'expiry_date': date, 'type': false };
    let headers = {headers:{'Content-Type': 'application/json'}};
    return this.http.post(`http://localhost:3000/api/create_notice`, body, headers);
  }

  getClassNotice(classid:string){
    return this.http.get(`http://localhost:3000/api/get_notice/${classid}`);
  }
}
