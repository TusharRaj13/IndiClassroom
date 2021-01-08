import { Component, OnInit } from '@angular/core';
import { AttendanceFetcherService } from '../../services/attendance-fetcher.service';

@Component({
  selector: 'app-take-attendance',
  templateUrl: './take-attendance.component.html',
  styleUrls: ['./take-attendance.component.css']
})
export class TakeAttendanceComponent implements OnInit {
  classinfo;
  sheet: String[]=[];

  constructor(private attend:AttendanceFetcherService) { }

  ngOnInit(): void {
    this.classinfo=JSON.parse(localStorage.getItem('classinfo'));
  }
  OnToggle(e) {
    // alert(e.target.value);
    
    if (e.target.checked) {
      this.sheet.push(e.target.value);
    }
    else
    {
      const index = this.sheet.indexOf(e.target.value);
      this.sheet.splice(index, 1);
    }
    // alert(this.sheet);
  }
  OnSubmit() {
    // alert(this.sheet);
    this.attend.createAttendance(this.classinfo['class_id'], this.sheet).subscribe(
      data => {
        if (data['success'])
        {
          alert(data['msg']);
        }
        else {
          alert('error occured');
        }
      }
    );
  }
}

