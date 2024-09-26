import { OAuthModuleConfig } from "angular-oauth2-oidc"
import { environment } from "src/environments/environment.development"

export const authModuleConfig:OAuthModuleConfig = {

    resourceServer:{

        allowedUrls:[
            'http://localhost:9090/api',
            // environment.blogResourceEndpoint
        ],
        
        sendAccessToken: true
    }

}