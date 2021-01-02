import { Component, OnInit } from '@angular/core';
import { BackendAuthService } from 'src/app/services/backend-auth.service';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})
export class NavheaderComponent implements OnInit {

  user: SocialUser;
  username: string;
  loggedIn: boolean;
  socialLoggedIn: boolean;

  constructor(private authService: SocialAuthService,
    private backendAuthService: BackendAuthService, private router:Router) {
      this.router.events.subscribe((ev) => {
        if(ev instanceof NavigationEnd){
          console.log(ev);
        }
      })
    }

  ngOnInit(): void {

    this.loggedIn = localStorage.getItem('user') != null;
    if(this.loggedIn)
      this.username = JSON.parse(localStorage.getItem('user'))["username"];
    else
      localStorage.removeItem('user');

    this.authService.authState.subscribe((user) => {
      this.user = user;
      //console.log(user);
      this.socialLoggedIn = (user != null);
      this.loggedIn = (user != null);
      if(this.loggedIn)
      {
        this.backendAuthService.postApiLogin(user.idToken).subscribe(
          data => {
            //console.log(data);
            this.backendAuthService.userInfo = data;
            localStorage.setItem('user', JSON.stringify(data["data"]));
            this.username = JSON.parse(localStorage.getItem('user'))["username"];
            this.router.navigateByUrl('/dashboard');
          },
          err => console.error(err)
        );
      }
      else
      {
        this.router.navigateByUrl('');
        localStorage.removeItem('user');
      }
    });
  }

  onGoogleLogin(){
    if(!this.loggedIn)
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  onLogout(){
    if (this.socialLoggedIn) {
      this.authService.signOut();
    }
    this.loggedIn = false;
    localStorage.removeItem('user');
    this.router.navigateByUrl('');
  }

}
