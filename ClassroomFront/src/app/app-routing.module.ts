import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { CreateclassroomComponent } from './components/createclassroom/createclassroom.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AssingmentComponent } from './components/assingment/assingment.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { TakeQuizComponent } from './components/take-quiz/take-quiz.component';


const routes: Routes = [
  { path:"", component: HomeComponent },
  { path:"login", component: LoginComponent },
  { path:"dashboard", component: DashboardComponent},
  { path: "class/:id", component: ClassroomComponent },
  { path: "class/:id/assignment", component: AssingmentComponent },
  { path: "class/:id/attendance", component: AttendanceComponent},
  { path: "class/:id/quiz", component: QuizComponent},
  { path: "class/:id/quiz/create", component: CreateQuizComponent},
  { path: "class/:id/quiz/:qid", component: TakeQuizComponent},
  { path: "test", component: CreateclassroomComponent },
  { path: "about-us", component: AboutUsComponent},
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

