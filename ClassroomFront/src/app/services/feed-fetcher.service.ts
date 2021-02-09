import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedFetcherService {

  constructor(private http:HttpClient) { }
  
  createFeed(googleid: string, classid: string, text: string) {
    let body = { 'userid': googleid, 'classid': classid, 'text': text };
    let headers = { headers: { 'Content-Type': 'application/json' } };
    return this.http.post(`http://localhost:3000/api/create_post`, body, headers);
  }
  createFeedReply(googleid: string, postid: string, text: string) {
    let body = { 'userid': googleid, 'postid': postid, 'text': text };
    let headers = { headers: { 'Content-Type': 'application/json' } };
    return this.http.post(`http://localhost:3000/api/create_post_reply`, body, headers);
  }
  getClassFeed(classid: string) {
    return this.http.get(`http://localhost:3000/api/get_feeds/${classid}`);
  }
}
