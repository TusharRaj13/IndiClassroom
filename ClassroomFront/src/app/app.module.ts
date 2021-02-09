import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, SocialAuthServiceConfig, SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BackendAuthService } from './services/backend-auth.service';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { ClassroomFetcherService } from './services/classroom-fetcher.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateclassroomComponent } from './components/createclassroom/createclassroom.component';
import { NoticeboardComponent } from './components/noticeboard/noticeboard.component';
import { JoinclassroomComponent } from './components/joinclassroom/joinclassroom.component';
import { NavheaderComponent } from './components/navheader/navheader.component';
import { AssingmentComponent } from './components/assingment/assingment.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { CreatenoticeComponent } from './components/createnotice/createnotice.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NoticeFetcherService } from './services/notice-fetcher.service';
import { TakeAttendanceComponent } from './components/take-attendance/take-attendance.component';
import { FeedsComponent } from './feeds/feeds.component';
import { FeedFetcherService } from './services/feed-fetcher.service';
import { CreatefeedComponent } from './createfeed/createfeed.component';
import { CreatefeedreplyComponent } from './createfeedreply/createfeedreply.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { QuizFetcherService } from './services/quiz-fetcher.service';
import { QuizItemComponent } from './components/quiz-item/quiz-item.component';
import { TakeQuizComponent } from './components/take-quiz/take-quiz.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    ClassroomComponent,
    DashboardComponent,
    CreateclassroomComponent,
    NoticeboardComponent,
    JoinclassroomComponent,
    NavheaderComponent,
    AssingmentComponent,
    AttendanceComponent,
    CreatenoticeComponent,
    AboutUsComponent,
    TakeAttendanceComponent,
    FeedsComponent,
    CreatefeedComponent,
    CreatefeedreplyComponent,
    QuizComponent,
    CreateQuizComponent,
    QuizItemComponent,
    TakeQuizComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '472316975840-fmnd8aqglnoqn89q696fe105g0m6v82s.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    BackendAuthService,
    ClassroomFetcherService,
    NoticeFetcherService,
    FeedFetcherService,
    QuizFetcherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
