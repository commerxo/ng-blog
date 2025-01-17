import { BaseEntity } from "./base-entity";
import { Category } from "./category";
import { SubCategory } from "./sub-category";
import { Tag } from "./tag";

export class Post extends BaseEntity{

    public id:string;
    public title:string;
    public slugTitle:string;
    public summary:string;
    public content:string;
    public publishedAt:Date;
    public postImageURL: string;
    public isPublished: string;
    public tags:Tag[];
    public categories: Category[];
    public subCategory:SubCategory;

}