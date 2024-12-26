import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseHelper } from 'src/app/models/database-helper';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-trending-post-list',
  templateUrl: './trending-post-list.component.html',
  styleUrls: ['./trending-post-list.component.sass']
})
export class TrendingPostListComponent implements OnInit {

  postList:Post[];


  private databaseHelper:DatabaseHelper = new DatabaseHelper();
  constructor(private postService:PostService, private route:Router){
    this.databaseHelper.currentPage = 1;
    this.databaseHelper.itemPerPage = 6;
    this.databaseHelper.search = '';
    this.databaseHelper.sortBy = 'createdDate';
    this.databaseHelper.sortOrder = 'desc';
  }

  ngOnInit(): void {
      this.getLatestPosts()
  }


  redirectToPostList(){
    this.route.navigateByUrl("/post/list")
  }

  getLatestPosts(){
    this.postService.getAllPost(this.databaseHelper).subscribe((response)=>{
      this.postList = response.data;
    },(error)=>{

    })
  }

}
