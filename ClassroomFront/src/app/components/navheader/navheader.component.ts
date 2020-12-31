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
  loggedIn: boolean;

  constructor(private authService: SocialAuthService,
    private backendAuthService: BackendAuthService, private router:Router) {
      this.router.events.subscribe((ev) => {
        if(ev instanceof NavigationEnd){
          console.log(ev);
        }
      })
    }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      //console.log(user);
      this.loggedIn = (user != null);
      if(this.loggedIn)
      {
        this.backendAuthService.postApiLogin(user.idToken).subscribe(
          data => {
            //console.log(data);
            this.backendAuthService.userInfo = data;
            this.router.navigateByUrl('/dashboard')
          },
          err => console.error(err)
        );
      }
      else
      {
        this.router.navigateByUrl('');
      }
    });
  }

  onGoogleLogin(){
    if(!this.loggedIn)
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  onLogout(){
    if (this.loggedIn) {
      this.authService.signOut();
      //this.user = null;
      //this.loggedIn = false;
      //this.router.navigateByUrl('/');
    }

  }

}
