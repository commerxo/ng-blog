import { BaseEntity } from "./base-entity";
import { Post } from "./post";


export class Category extends BaseEntity{

    public id:string;
    public categoryName:string;
    public description:string;
    public isActive:boolean;
    public posts:Post[];

}