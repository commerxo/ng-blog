import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIResponse } from 'src/app/models/api-response';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.sass']
})
export class ViewPostComponent implements OnInit{

  postData:Post;
  title:string;

  constructor(
    private postService:PostService, 
    private activeRouting:ActivatedRoute){}

  ngOnInit(): void {
      this.activeRouting.params.subscribe(param => {
        if(param['title']){
          this.getPublishedPostBySlug(param['title'])
        }
      })
  }

  getPublishedPostBySlug(title:string){

    this.postService.getPostBySlugTitle(title).subscribe((response:APIResponse<Post>) => {
      debugger
      console.log(response.data);
      this.postData = response.data;
    },(error)=>{

    })
  }
}
