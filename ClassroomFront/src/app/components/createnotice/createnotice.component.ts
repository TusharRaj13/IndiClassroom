import { Component, OnInit } from '@angular/core';
import { NoticeFetcherService } from 'src/app/services/notice-fetcher.service';

@Component({
  selector: 'app-createnotice',
  templateUrl: './createnotice.component.html',
  styleUrls: ['./createnotice.component.css']
})
export class CreatenoticeComponent implements OnInit {

  constructor(private notice:NoticeFetcherService) { }

  ngOnInit(): void {
  }


  createNotice(notice, dt){
    console.log(notice + ' ' + dt);
    let userinfo = JSON.parse(localStorage.getItem('user'));
    let classinfo = JSON.parse(localStorage.getItem('classinfo'));
    this.notice.createNotice(userinfo["googleId"], classinfo["class_id"], notice, dt).subscribe(
      data => {
        if(data["data"]){
          alert("Notice Created");
        }
      }
    )
  }

}
