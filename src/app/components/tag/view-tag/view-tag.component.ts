import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { APIError } from 'src/app/models/api-error';
import { APIResponse } from 'src/app/models/api-response';
import { DatabaseHelper } from 'src/app/models/database-helper';
import { Post } from 'src/app/models/post';
import { Tag } from 'src/app/models/tag';
import { TagParam } from 'src/app/models/tag-param';
import { PostService } from 'src/app/services/post.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-view-tag',
  templateUrl: './view-tag.component.html',
  styleUrls: ['./view-tag.component.sass']
})
export class ViewTagComponent implements OnInit {

  apiError:APIError;
  routeSub:Subscription;
  tags:Tag;
  posts:Post[];
  totalPosts:number;
  tagParam:TagParam = new TagParam();
  databaseHelper:DatabaseHelper = new DatabaseHelper();

  constructor(
    private activeRouting:ActivatedRoute,
    private tagService:TagService,
    private postService:PostService,
    private toastrService:ToastrService

  ){
    this.tagParam.currentPage = 0;
    this.tagParam.itemPerPage = 10;
    this.tagParam.sortOrder = "desc";
    this.tagParam.sortBy = "";
    this.tagParam.filterRequired = false;
    this.tagParam.isPostRequired = false;
    this.tagParam.isSubCategoryRequired = false;

    this.databaseHelper.currentPage = 0;
    this.databaseHelper.itemPerPage = 10;
    this.databaseHelper.sortOrder = "desc"
    this.databaseHelper.sortBy = "";
  }

  ngOnInit(): void {
    this.routeSub = this.activeRouting.params.subscribe(param => {
      if(param['tag']){
        this.getTagByName(param['tag'])
      }
    })
  }

  getTagByName(name:string){
    this.tagParam.tagName = name;
    this.tagService.getAllTagsBySubCategoryName(this.tagParam).subscribe((response:APIResponse<Tag[]>)=>{
      if(response.status == 200){
        this.tags = response.data[0];
        this.getPostsByTagName(name);
      }
    },(error:APIError)=>{
        this.apiError = error;
        this.toastrService.error(error.message, error.status + " - " + error.error)
    });
  }

  getPostsByTagName(tagName:string){
    this.postService.getAllPostByTagName(tagName,this.databaseHelper).subscribe((response:APIResponse<Post[]>)=>{
      console.log(response)
      debugger
      this.posts = response.data
      this.totalPosts = response.totalItems;
    },(error:APIError)=>{
      this.apiError = error;
      this.toastrService.error(error.message, error.status + " - " + error.error);
    })
  }

}
