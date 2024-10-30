import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { APIResponse } from "../models/api-response";
import { ContactUs } from "../models/contact-us";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn:'root'
})
export class ContactService{

    constructor(private _httpClient:HttpClient){}

    raiseQuery(contactRegisterRequest):Observable<APIResponse<ContactUs>>{
        const headers = new HttpHeaders({
            "Content-Type":"application/json"
          });
        return this._httpClient.post<APIResponse<ContactUs>>(environment.blogResourceEndpoint+environment.apiVersion_1 + "/contact-us",JSON.stringify(contactRegisterRequest),{headers})
        .pipe(catchError(this.handleError));
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