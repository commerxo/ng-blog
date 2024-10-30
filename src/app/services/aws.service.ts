import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment.development";
import { APIResponse } from "../models/api-response";



@Injectable({
    providedIn:'root'
})
export class AWSService{

    constructor(private _httpClient:HttpClient){}


    uploadToS3(formData:FormData):Observable<APIResponse<String>>{
        return this._httpClient.post<APIResponse<string>>(environment.blogResourceEndpoint + environment.apiVersion_1+"/aws/s3/upload", formData)
        .pipe(catchError(this.handleError))
    }

    private handleError(error:any) {
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message.
       //@ts-ignore
       const authError = error.error.message;
       console.log(error)
        return throwError(authError);
      }
}