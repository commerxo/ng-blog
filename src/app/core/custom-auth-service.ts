import { Injectable } from "@angular/core";
import { OAuthErrorEvent, OAuthService, OAuthSuccessEvent, OidcDiscoveryDoc } from "angular-oauth2-oidc";
import { environment } from "src/environments/environment";
import { aConfig } from "./custom-auth-config";

@Injectable({providedIn:'root'})
export class OAuthSer extends OAuthService{


    override loadDiscoveryDocument(fullUrl?: string): Promise<OAuthSuccessEvent> {
        debugger
        return new Promise((resolve, reject) => {
            if (!fullUrl) {
              fullUrl = this.issuer || '';
              if (!fullUrl.endsWith('/')) {
                fullUrl += '/';
              }
              fullUrl += '.well-known/openid-configuration';
            }
      
            // if (!this.validateUrlForHttps(fullUrl)) {
            //   reject(
            //     "issuer  must use HTTPS (with TLS), or config value for property 'requireHttps' must be set to 'false' and allow HTTP (without TLS)."
            //   );
            //   return;
            // }
      
            this.http.get<OidcDiscoveryDoc>(fullUrl).subscribe(
              doc => {
                // if (!this.validateDiscoveryDocument(doc)) {
                //   this.eventsSubject.next(
                //     new OAuthErrorEvent('discovery_document_validation_error', null)
                //   );
                //   reject('discovery_document_validation_error');
                //   return;
                // }
                debugger
                console.debug(doc.authorization_endpoint)
                this.loginUrl = this.replace(doc.authorization_endpoint);
                this.logoutUrl = this.replace(doc.end_session_endpoint) || this.replace(this.logoutUrl);
                this.grantTypesSupported = doc.grant_types_supported;
                this.issuer = this.replace(doc.issuer);
                this.tokenEndpoint = this.replace(doc.token_endpoint);
                this.userinfoEndpoint =
                  this.replace(doc.userinfo_endpoint) || this.replace(this.userinfoEndpoint);
                this.jwksUri = this.replace(doc.jwks_uri);
                this.sessionCheckIFrameUrl =
                this.replace(doc.check_session_iframe) || this.sessionCheckIFrameUrl;
      
                this.discoveryDocumentLoaded = true;
                this.discoveryDocumentLoadedSubject.next(doc);
                this.revocationEndpoint = this.replace(doc.revocation_endpoint);
      
                if (this.sessionChecksEnabled) {
                  this.restartSessionChecksIfStillLoggedIn();
                }
      
                this.loadJwks()
                  .then(jwks => {
                    const result: object = {
                      discoveryDocument: doc,
                      jwks: jwks
                    };
      
                    const event = new OAuthSuccessEvent(
                      'discovery_document_loaded',
                      result
                    );
                    this.eventsSubject.next(event);
                    resolve(event);
                    return;
                  })
                  .catch(err => {
                    this.eventsSubject.next(
                      new OAuthErrorEvent('discovery_document_load_error', err)
                    );
                    reject(err);
                    return;
                  });
              },
              err => {
                this.logger.error('error loading discovery document', err);
                this.eventsSubject.next(
                  new OAuthErrorEvent('discovery_document_load_error', err)
                );
                reject(err);
              }
            );
          });
        }
      
    replace (str:string){
        if(str==null){
            return str;
        }
        return str.replace("http","https");
    }
}