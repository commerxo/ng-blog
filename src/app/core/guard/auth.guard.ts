import { inject, Injectable, Injector } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, CanLoadFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth.service";
import { OAuthService, OAuthStorage } from "angular-oauth2-oidc";
import { jwtDecode } from "jwt-decode";


@Injectable({
    providedIn:'root'
})
export class AuthGuard{

    constructor(private router:Router, private authStorage:OAuthStorage, private injector:Injector, private oauthService:AuthService){}

    canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot){
        // add logic
        // debugger
        console.log("working...." + this.authStorage);
        return true;

    }


    canLoad(next:ActivatedRouteSnapshot, state:RouterStateSnapshot){
        return false;
    }


    private checkAuth():boolean{
        debugger
        if(this.oauthService.hasValidToken()){ // check if token not expired
            return true;
        }
        this.oauthService.initiateLoginPKCECodeFlow();
        return false;
    }
    
}


export function AuthCanLoadGuard(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return inject(AuthGuard).canLoad(next, state);
}

export const AuthActivatedGuards: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(AuthGuard).canActivate(next, state);
}
