import { Category } from "./category";
import { Tag } from "./tag";


export class SubCategory{

    public id:string;
    public subCategoryName:string;
    public description:string;
    public isActive:boolean;
    public category:Category;
    public tags:Tag[];

}