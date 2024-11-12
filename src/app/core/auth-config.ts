import { AuthConfig } from "angular-oauth2-oidc";
import { environment } from "src/environments/environment.development";


export const authConfig: AuthConfig = {

    issuer: environment.oauthIssuerEndpoint,

    clientId: "pk-client",

    redirectUri: window.location.origin,

    responseType: "code",

    scope: 'openid profile email',

    showDebugInformation: true,

    disablePKCE: false,
    
    sessionChecksEnabled: true,

    useSilentRefresh: true,

    nonceStateSeparator:"semicolon",

    requireHttps: false,

    tokenEndpoint: environment.oauthIssuerEndpoint + "/oauth2/token",

    clearHashAfterLogin: false,
   
}