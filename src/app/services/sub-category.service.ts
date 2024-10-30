import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SubCategory } from "../models/sub-category";
import { APIResponse } from "../models/api-response";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment.development";


@Injectable({
    providedIn: 'root'
})
export class SubCategoryService{
    
    constructor(private _httpClient:HttpClient){}

    
    getSubCategoryByCategoryName(categoryName:string):Observable<APIResponse<SubCategory[]>>{
        return this._httpClient.get<APIResponse<SubCategory[]>>(environment.blogResourceEndpoint+environment.apiVersion_1+"/sub/category/"+categoryName+"/category")
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