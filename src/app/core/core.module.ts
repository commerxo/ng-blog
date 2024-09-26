import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthConfig, DefaultOAuthInterceptor, OAuthModule, OAuthModuleConfig, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth-config';
import { authAppInitializerFactory } from './auth-app-initializer-factory';
import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { authModuleConfig } from './auth-module-config';
import { RouterStateSnapshot } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    OAuthModule.forRoot(),
    CommonModule
  ]
})
export class CoreModule { 

  constructor(private oauthService:OAuthService){

    this.oauthService.loadDiscoveryDocument();
  }
  static forRoot(): ModuleWithProviders<CoreModule>{

    return {
      ngModule: CoreModule,
      providers:[
        {provide: APP_INITIALIZER, useFactory:authAppInitializerFactory, deps:[AuthService], multi:true},
        // {provide: HTTP_INTERCEPTORS, useClass: DefaultOAuthInterceptor,deps:[AuthService], multi:true},
        {provide: AuthConfig, useValue: authConfig},
        {provide: OAuthModuleConfig, useValue: authModuleConfig}
      ]
    };
  }
}
