import { BaseEntity } from "./base-entity";

export class Tag extends BaseEntity{

    public id:string;
    public tagName:string;
    public description:string;
    public isActive:boolean;
    public post:any[];

}