import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendAuthService {

  constructor(private http:HttpClient) { }

  public userInfo;
  postApiLogin(tokenid:string){
    let body = { 'tokenid': tokenid };
    let headers = {headers:{'Content-Type': 'application/json'}};
    return  this.http.post('http://localhost:3000/api/login', body, headers);
    //return this.userInfo;
  }
}
