import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedFetcherService } from '../services/feed-fetcher.service';


@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
  feeds: any[];
  classid: string;
  

  constructor(private router:ActivatedRoute, private feedFetcher:FeedFetcherService) { }

  ngOnInit(): void {
    // let userinfo = JSON.parse(localStorage.getItem('user'));
    // let classinfo = JSON.parse(localStorage.getItem('classinfo'));
    this.router.params.subscribe((params) => {
      this.classid = params['id'];
     /*  classinfo['classid'].forEach(elements => {
        if(elements['userid'] == userinfo['googleId']) {
          console.log(elements);
        }
      }); */
      this.feedFetcher.getClassFeed(this.classid).subscribe(data => {
        if (data['success']) {
          this.feeds = data['data'];
        }
        else
        {
          alert(data['msg']);
        }
      }
      )
      console.log(this.classid);
    });
    
  }
  sendFeedReply(feed, post) {
    let userinfo = JSON.parse(localStorage.getItem('user'));
    console.log(post);
    this.feedFetcher.createFeedReply(userinfo['googleId'], post, feed).subscribe(data => {
      if (data['success']) {
        alert("Reply Created");
      }
      else {
        alert(data['msg']);
      }
      location.reload();
    })
    
  }
  createFeed() {
    document.getElementById('mod3').style.display = "block";
    
  }
  closemod2() {
    document.getElementById('mod3').style.display = "none";
  }
  createFeedReply(post) {
    document.getElementById('post').setAttribute('value', post);
    document.getElementById('mod4').style.display = "block";
  }
  closemod3() {
    document.getElementById('mod4').style.display = "none";
  }
}
