import { Component, HostListener, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { APIResponse } from 'src/app/models/api-response';
import { DatabaseHelper } from 'src/app/models/database-helper';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements  OnInit, OnDestroy {

  searchForm:FormGroup;
  searchControl:FormControl;

  databaseHelper:DatabaseHelper=new DatabaseHelper()

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.showPopup(2,event);
    event.stopPropagation()  
  }

  showList:boolean =  false;
  result:string[] = [];
  post:Post[]
  

  constructor(private formBuilder:FormBuilder,
    private postService:PostService
  ){
    this.showList = false;
    this.databaseHelper.currentPage = 1;
    this.databaseHelper.itemPerPage = 10;
    this.databaseHelper.search = '';
    this.databaseHelper.sortBy = 'createdDate';
    this.databaseHelper.sortOrder = 'desc';
  }

  ngOnInit() {
      this.createFormControl();
      this.createForm()
      this.onChange()
  }

  createFormControl(){
    this.searchControl = new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]);
  }

  createForm(){

    this.searchForm = new FormGroup({

      searchControl:this.searchControl
    })
  }

  onChange(){
    // this.databaseHelper.search =  event;
    // this.postService.searchPost(this.databaseHelper).subscribe((response:APIResponse<Post[]>)=>{
    //   this.post = response.data
    // },(error)=>{
    //   this.post = null;
    //   console.log("Error!")
    // })
    this.post = []
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value)=>{
        this.databaseHelper.search = value;
        this.postService.searchPost(this.databaseHelper).subscribe((response:APIResponse<Post[]>)=>{
            this.post = response.data;
        })
    })
    //  this.searchForm.valueChanges
    //   .pipe(
    //     debounceTime(500), // Wait 500ms after each keystroke
    //     distinctUntilChanged(), // Only emit if the value has changed
    //     switchMap(value => {
    //       console.log(value.searchControl);
    //       re = '';
    //        this.data.push(event)
    //       return event
    //       }) // call serch api
    //   ).subscribe(result =>{
    // })

  }

  showPopup(id, event){
    if(id == 1) {
      this.showList = true;
      event.stopPropagation()
    } else {
      this.showList = false;
    }
  }

  ngOnDestroy(): void {
      this.result = null;
  }

}
