import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector, Optional } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { catchError, Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { OAuthModuleConfig, OAuthResourceServerErrorHandler, OAuthStorage } from "angular-oauth2-oidc";


@Injectable()
export class DefaultOAuthInterceptor implements HttpInterceptor {
    
    constructor(
        private authStorage: OAuthStorage,
        private errorHandler: OAuthResourceServerErrorHandler,
        @Optional() private moduleConfig: OAuthModuleConfig,
        private injector:Injector
    ) {
    }

    private authService = this.injector.get(AuthService);

    private checkUrl(url: string): boolean {
        let found = this.moduleConfig.resourceServer.allowedUrls.find(u => url.startsWith(u));
        return !!found;
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        // debugger
        let url = req.url.toLowerCase();

        // debugger
        if (!this.moduleConfig) return next.handle(req);
        if (!this.moduleConfig.resourceServer) return next.handle(req);
        if (!this.moduleConfig.resourceServer.allowedUrls) return next.handle(req);
        if (!this.checkUrl(url)) return next.handle(req);

        let sendAccessToken = this.moduleConfig.resourceServer.sendAccessToken;
        
        if (sendAccessToken) {

            let token = this.authStorage.getItem('access_token');
            let header = 'Bearer ' + token;

            let headers = req.headers
                                .set('Authorization', header);

            req = req.clone({ headers });
        }
        

        return next.handle(req).pipe(catchError(err => this.errorHandler.handleError(err)));

    }

}