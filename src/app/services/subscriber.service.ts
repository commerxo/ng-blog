import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { APIResponse } from "../models/api-response";
import { Subscriber } from "../models/subscriber";
import { environment } from "src/environments/environment.development";


@Injectable({
    providedIn: 'root'
})
export class SubscriberService{

    constructor(private _httpClient:HttpClient){}

    subscribe(emailId:string):Observable<APIResponse<Subscriber>>{
        const params = new HttpParams()
        .set("emailId", emailId)
        debugger
        return this._httpClient.post<APIResponse<Subscriber>>(environment.blogResourceEndpoint + environment.apiVersion_1 + "/subscriber/active",{},{params})
        .pipe(catchError(this.handleError))
    }

    unSubscribe(emailId:string):Observable<APIResponse<Subscriber>>{
        const params = new HttpParams()
        .set("emailId", emailId)
        debugger
        return this._httpClient.put<APIResponse<Subscriber>>(environment.blogResourceEndpoint + environment.apiVersion_1 + "/subscriber/de-active",{params})
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