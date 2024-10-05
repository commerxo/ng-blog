import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { PostService } from '../../services/post.service';
import { APIResponse } from 'src/app/models/api-response';
import { TagService } from 'src/app/services/tag.service';
import { environment } from 'src/environments/environment.development';
import { Tag } from 'src/app/models/tag';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Post } from 'src/app/models/post';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.sass']
})
export class CreatePostComponent implements OnInit {

  @ViewChild('multiSelect') multiSelect;
  @Output() onFormUpdate = new EventEmitter<string>();

  dropdownList=[];

  postForm:FormGroup;
  title: FormControl;
  category:FormControl;
  tags:FormControl;
  summary:FormControl;
  content:FormControl;


  tagList:Tag[];
  settings:[];
  categories:Category[]
  postData:Post = new Post();

  tinymceInit;

  dropdownSettings:IDropdownSettings = {};

  constructor(
    private tagService:TagService,
    private postService:PostService,
    private categoryService:CategoryService
  ){}

  ngOnInit() {
  
    this.tinymceInit = environment.tinymceInit;
    this.dropdownSettings = environment.ngMultiSelectDropdownSetting;
    
    this.getTagList();
    this.getCategoryList();
    this.createPostFormControl();
    this.createForm();
  }

  createPostFormControl(){

    this.title = new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]);
    this.category = new FormControl("", Validators.required);
    this.tags = new FormControl("", [
      Validators.required,
      Validators.minLength(1)
    ]);
    this.summary = new FormControl("", [
      Validators.required,
      Validators.minLength(150)
    ])
    this.content = new FormControl("", Validators.required);
  }

  createForm(){

    this.postForm = new FormGroup({
      title: this.title,
      category:this.category,
      tags:this.tags,
      summary:this.summary,
      content: this.content
    });

    this.postData.title = this.postForm.get("title").value;
    this.postData.content = this.postForm.get("content").value;
    this.postData.summary = this.postForm.get("summary").value;
    
  }

  getTagList(){
    this.tagService.getAllTags().subscribe((response:APIResponse<Tag[]>) => {
      this.tagList = response.data;
      let tmp = [];
      for(let i=0; i<this.tagList.length; i++){
        tmp.push(this.tagList[i].tagName);
      }
      this.dropdownList = tmp;
    },(error)=>{
      debugger
      console.log("thrown Error" + error);
    })
  }

  getCategoryList(){
    this.categoryService.getAllCategories().subscribe((response:APIResponse<Category[]>)=>{
      debugger
      this.categories = response.data;
    },(error)=>{
      console.log("Error in fetching category")
    })
  }

  publishNewPost(){
    this.postService.saveNewPost(this.postForm.value).subscribe((response:APIResponse<Post>)=>{
        this.postForm.reset();
    },(error)=>{
      console.log("Error while saving the post!")
    }) 
  }

  update(postDat:FormGroup){
    this.postData.content = postDat.get("content").value;
    // this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.postData.content);
    // console.log(postDat.get("title").value)
  }

  public onFilterChange(item: any) {
    console.log(item);
  }
  public onDropDownClose(item: any) {
    console.log(item);
  }

  public onItemSelect(item: any) {
    console.log(item);
  }
  public onDeSelect(item: any) {
    console.log(item);
  }

  public onSelectAll(items: any) {
    console.log(items);
  }
  public onDeSelectAll(items: any) {
    console.log(items);
  }

}