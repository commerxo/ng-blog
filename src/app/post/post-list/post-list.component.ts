import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIError } from 'src/app/models/api-error';
import { DatabaseHelper } from 'src/app/models/database-helper';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass'],
})
export class PostListComponent implements OnInit {
  postList: Post[];

  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = false;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  };
  public labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`,
  };
  public eventLog: string[] = [];

  databaseHelper: DatabaseHelper = new DatabaseHelper();

  constructor(
    private postService: PostService,
    private toastrService:ToastrService,
    private loader:NgxUiLoaderService

  ) {
    this.databaseHelper.currentPage = 1;
    this.databaseHelper.itemPerPage = 10;
    this.databaseHelper.search = '';
    this.databaseHelper.sortBy = 'createdDate';
    this.databaseHelper.sortOrder = 'desc';
  }

  ngOnInit(): void {
    debugger
    this.loader.start()
    setTimeout(() => {
      this.loader.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 5000);
    this.getPosts();
  }

  getPosts() {
    this.postService.getAllPost(this.databaseHelper).subscribe(
      (response) => {
        if(response.status == 200){
          this.postList = response.data;
          this.config.totalItems = response.totalItems;
        }
      },
      (error:APIError) => {
        this.toastrService.error( error.message, error.status +" - " + error.error);
      }
    );
  }

  onPageChange(number: number) {
    this.logEvent(`pageChange(${number})`);
    console.log(number);
    this.config.currentPage = number;
    this.databaseHelper.currentPage = number;
    this.getPosts();
  }

  onPageBoundsCorrection(number: number) {
    this.logEvent(`pageBoundsCorrection(${number})`);
    this.config.currentPage = number;
  }

  private logEvent(message: string) {
    this.eventLog.unshift(`${new Date().toISOString()}: ${message}`);
  }
}
