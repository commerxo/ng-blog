import { DatabaseHelper } from "./database-helper";

export class TagParam extends DatabaseHelper{

    public tagName:string;
    public filterRequired:boolean;
    public isSubCategoryRequired:boolean;
    public isPostRequired:boolean;
    public subCategoryName:boolean;
}