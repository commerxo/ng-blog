import { HttpClient } from "@angular/common/http";
import { APIResponse } from "../models/api-response";
import { TagList } from "../models/TagList";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment.development";
import { Injectable } from "@angular/core";
import { Tag } from "../models/tag";


@Injectable({
    providedIn:'root'
})
export class TagService{
    
    
    constructor(private _httpClient:HttpClient){}

    getAllTags():Observable<APIResponse<Tag[]>>{
        return this._httpClient.get<APIResponse<Tag[]>>(environment.blogResourceEndpoint+"/tag/all")
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
       debugger

        // Return an observable with a user-facing error message.
       //@ts-ignore
       const authError = error.error.message;
       debugger
       console.log(error)
        return throwError(authError);
      }
}