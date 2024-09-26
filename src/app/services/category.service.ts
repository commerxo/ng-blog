import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { APIResponse } from "../models/api-response";
import { Tag } from "../models/tag";
import { Category } from "../models/category";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";


@Injectable({
    providedIn: 'root'
})
export class CategoryService{

    constructor(private _httpClient:HttpClient){}

    getAllCategories():Observable<APIResponse<Category[]>>{
        return this._httpClient.get<APIResponse<Category[]>>(environment.blogResourceEndpoint+environment.apiVersion_1+"/category/all")
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