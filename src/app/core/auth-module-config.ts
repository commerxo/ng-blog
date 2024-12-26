import { OAuthModuleConfig } from "angular-oauth2-oidc"
import { environment } from "src/environments/environment.development"

export const authModuleConfig:OAuthModuleConfig = {


    resourceServer:{

        allowedUrls:[
            'http://localhost:5001/api',
            'http://auth-server-env.eba-5eajkmd4.ap-south-1.elasticbeanstalk.com/api',
            environment.blogResourceEndpoint
        ],
        
        sendAccessToken: true
    }

}