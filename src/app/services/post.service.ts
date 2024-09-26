import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { APIResponse } from "../models/api-response";
import { TagList } from "../models/TagList";
import { environment } from "src/environments/environment.development";
import { Post } from "../models/post";


@Injectable({
    providedIn:'root'
})
export class PostService{

    constructor(private _httpClient:HttpClient){}

    saveNewPost(postCreationRequest):Observable<APIResponse<Post>>{
      debugger
      const headers = new HttpHeaders({
        "Content-Type":"application/json"
      });
      return this._httpClient.post<APIResponse<Post>>(environment.blogResourceEndpoint+environment.apiVersion_1+"/post",JSON.stringify(postCreationRequest),{headers})
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
       debugger

        // Return an observable with a user-facing error message.
       //@ts-ignore
       const authError = error.error.message;
       debugger
       console.log(error)
        return throwError(authError);
      }
      
}