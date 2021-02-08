import { Component, OnInit } from '@angular/core';
import { AttendanceFetcherService } from 'src/app/services/attendance-fetcher.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  is_teacher : boolean;
  

  constructor(private attendanceFetcher:AttendanceFetcherService) { }

  ngOnInit(): void {
  }

  take(){
    
  }

}
