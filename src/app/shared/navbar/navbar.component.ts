import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/core/auth.service';
import { SubscriberService } from 'src/app/services/subscriber.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit{

  constructor(private authService:AuthService, private localStorage:CookieService,private subscriberService:SubscriberService){}

  

  ngOnInit(): void {
    // if(this.oauthService.hasValidAccessToken()){
    //   this.localStorage.set("access_token", this.oauthService.getAccessToken());
    // }
  }



  public login($event: any){
    $event.preventDefault();
    console.log("clicked")
    this.authService.initiateLoginPKCECodeFlow();
    
  }

  public isLoggedIn():boolean{

    return this.authService.hasValidToken();
  }

  public logout(){
    this.authService.logout();
  }
}


