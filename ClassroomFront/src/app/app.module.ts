import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, SocialAuthServiceConfig, SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BackendAuthService } from './services/backend-auth.service';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { ClassroomFetcherService } from './services/classroom-fetcher.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavheaderComponent } from './components/navheader/navheader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    ClassroomComponent,
    DashboardComponent,
    NavheaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule
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
    ClassroomFetcherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
