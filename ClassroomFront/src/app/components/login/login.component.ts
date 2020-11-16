import { Component, OnInit } from '@angular/core';
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
    private backendAuthService:BackendAuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if(this.loggedIn)
      {
        this.backendAuthService.postApiLogin(user.idToken).subscribe(
          data => console.log(data),
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
