import { Component, OnInit } from '@angular/core';
import { FeedFetcherService } from 'src/app/services/feed-fetcher.service';

@Component({
  selector: 'app-createfeed',
  templateUrl: './createfeed.component.html',
  styleUrls: ['./createfeed.component.css']
})
export class CreatefeedComponent implements OnInit {

  constructor(private feed:FeedFetcherService) { }

  ngOnInit(): void {
  }
  createFeed(feed) {
    console.log(feed);
    let userinfo = JSON.parse(localStorage.getItem('user'));
    let classinfo = JSON.parse(localStorage.getItem('classinfo'));
    this.feed.createFeed(userinfo["googleId"], classinfo["class_id"], feed).subscribe(data => {
      if (data["data"]) {
        alert("Feed Created");
      }
      location.reload();
    })
  }
}
