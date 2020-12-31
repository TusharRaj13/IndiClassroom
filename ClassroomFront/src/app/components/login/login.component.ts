import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { BackendAuthService } from 'src/app/services/backend-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: SocialAuthService,
    private backendAuthService:BackendAuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      this.loggedIn = (user != null);
      if(this.loggedIn)
      {
        this.backendAuthService.postApiLogin(user.idToken).subscribe(
          data => {
            console.log(data);
            this.backendAuthService.userInfo = data;
            this.router.navigateByUrl('/dashboard'); },
          err => console.error(err)
        );
      }
    });
  }

  onGoogleLogin(){
    if(!this.loggedIn)
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  onLogout(){
    if(this.loggedIn)
      this.authService.signOut();
  }

}
