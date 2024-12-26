import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { APIError } from 'src/app/models/api-error';
import { APIResponse } from 'src/app/models/api-response';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.sass']
})
export class ViewPostComponent implements OnInit, OnDestroy{

  postData:Post;
  title:string;
  apiError:APIError;
  routeSub:Subscription;

  constructor(
    private postService:PostService, 
    private activeRouting:ActivatedRoute,
    private toastrService:ToastrService){
    }

  ngOnInit(): void {
      this.routeSub = this.activeRouting.params.subscribe(param => {
        if(param['title']){
          this.getPublishedPostBySlug(param['title'])
        }
      })
      
  }

  getPublishedPostBySlug(title:string){

    this.postService.getPostBySlugTitle(title).subscribe((response:APIResponse<Post>) => {
      if(response.status == 200){
        this.postData = response.data;
      }
    },(error:APIError)=>{
        this.postData = null;
        this.apiError = error;
        this.toastrService.error(error.message, error.status + " - " + error.error)
    })
  }

  ngOnDestroy(): void {
      this.routeSub.unsubscribe()
      this.postData = null;
  }
}
