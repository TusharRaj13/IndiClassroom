import { Component, OnInit } from '@angular/core';
import { FeedFetcherService } from 'src/app/services/feed-fetcher.service';

@Component({
  selector: 'app-createfeedreply',
  templateUrl: './createfeedreply.component.html',
  styleUrls: ['./createfeedreply.component.css']
})
export class CreatefeedreplyComponent implements OnInit {

  constructor(private reply:FeedFetcherService) { }

  ngOnInit(): void {
  }
  createFeedReply(reply) {
    console.log(reply);
    let userinfo = JSON.parse(localStorage.getItem('user'));
    let classinfo = JSON.parse(localStorage.getItem('classinfo'));
    this.reply.createFeedReply(userinfo["googleId"], classinfo["class_id"], reply).subscribe(data => {
      if (data["data"]) {
        alert("Reply Created");
      }
      location.reload();
    })
  }
}
