import { HttpClient, HttpParams } from "@angular/common/http";
import { APIResponse } from "../models/api-response";
import { TagList } from "../models/TagList";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment.development";
import { Injectable } from "@angular/core";
import { Tag } from "../models/tag";
import { TagParam } from "../models/tag-param";


@Injectable({
    providedIn:'root'
})
export class TagService{
    
    
    constructor(private _httpClient:HttpClient){}

    getAllTags():Observable<APIResponse<Tag[]>>{
        return this._httpClient.get<APIResponse<Tag[]>>(environment.blogResourceEndpoint+environment.apiVersion_1+"/tag/all")
        .pipe(catchError(this.handleError))
    }


    getTagsByCategoryName(categoryName:string):Observable<APIResponse<Tag[]>>{
      return this._httpClient.get<APIResponse<Tag[]>>(environment.blogResourceEndpoint+"/sub/category/"+categoryName+"/category")
      .pipe(catchError(this.handleError));
    }

    getAllTagsBySubCategoryName(tagParam:TagParam):Observable<APIResponse<Tag[]>>{
      const params = new HttpParams()
      .set("tagName",tagParam.tagName)
      .set("filterRequired",tagParam.filterRequired)
      .set("isSubCategoryRequired", tagParam.isSubCategoryRequired)
      .set("isPostRequired", tagParam.isPostRequired)
      .set("subCategoryName", tagParam.subCategoryName)
      .set("currentPage", tagParam.currentPage)
      .set("itemPerPage", tagParam.itemPerPage)
      .set("sortOrder", tagParam.sortOrder)
      .set("sortBy",tagParam.sortBy)
      return this._httpClient.get<APIResponse<Tag[]>>(environment.blogResourceEndpoint+environment.apiVersion_1+"/tag/search",{params})
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