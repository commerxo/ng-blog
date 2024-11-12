import { ChangeDetectorRef, Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
import { SubCategory } from 'src/app/models/sub-category';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { TagParam } from 'src/app/models/tag-param';
import { AWSService } from 'src/app/services/aws.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.sass']
})
export class CreatePostComponent implements OnInit, OnChanges {

  @ViewChild('multiSelect') multiSelect;
  @Output() onFormUpdate = new EventEmitter<string>();

  dropdownList=[];

  postForm:FormGroup;
  title: FormControl;
  category:FormControl;
  subCategory:FormControl;
  tags:FormControl;
  summary:FormControl;
  content:FormControl;


  tagList:Tag[];
  settings:[];
  categories:Category[]
  selectedCategory:string;
  subCategories:SubCategory[];
  selectedSubCategory:string;
  postData:Post = new Post();
  tagSelectionDisable:boolean = true;

  // tinymceInit:any;

  tinymceInit:any = {
    baseUrl:'/tinymce',
    suffix: '.min',
        height: 500,
        // apiKey:'jug949l49wduq4fl7p7qzvwktc5d9nv442tysgqqrc1jh0sb',
        // license_key:'jug949l49wduq4fl7p7qzvwktc5d9nv442tysgqqrc1jh0sb',
        license_key: 'gpl',
        plugins: 'print preview paste noneditable imagetools importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
        skin:'oxide-dark',
        elements: "tabletextarea",
        automatic_uploads: true,
        // images_upload_url: 'postAcceptor.php',
        images_reuse_filename: true,
        menubar: 'file edit view insert format tools table help',
        content_css:["dark"],
        images_upload_handler:(blobImage:any)=>{
          return new Promise((resolve, reject)=>{
            const formData = new FormData();
            formData.append("file", blobImage.blob(), blobImage.filename())
            this.awsService.uploadToS3(formData).subscribe((res:APIResponse<String>)=>{
              resolve(res.data)
            },(error)=>{
              reject("Failed to upload!")
            })
          })
          
        },
        fullscreen_native: true,
        paste_data_images: true,
        autosave_ask_before_unload: true,
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        toolbar_mode: 'sliding',
        contextmenu: 'link image imagetools table',
        toolbar:'undo redo | preview |bold italic underline strikethrough |fullscreen | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media template link anchor codesample | ltr rtl',
        table_sizing_mode: 'relative',
        table_border_widths: [
            { title: 'small', value: '1px' },
            { title: 'medium', value: '3px' },
            { title: 'large', value: '5px' },
          ],
        table_default_attributes: {
            border: '1'
          }
  }
  
  dropdownSettings:IDropdownSettings = {};

  tagParam:TagParam = new TagParam();
  constructor(
    private tagService:TagService,
    private postService:PostService,
    private categoryService:CategoryService,
    private subCategoryService:SubCategoryService,
    private awsService: AWSService,
    private changeDetect:ChangeDetectorRef
  ){
    this.tagParam.currentPage = 0;
    this.tagParam.itemPerPage = 10;
    this.tagParam.sortOrder = "desc";
    this.tagParam.sortBy = "";
    this.tagParam.filterRequired = false;
    this.tagParam.isPostRequired = false;
    this.tagParam.isSubCategoryRequired = false;
    this.tagParam.tagName = ""
  }

  ngOnChanges(changes: SimpleChanges): void {}

  
  ngOnInit() {    
    this.dropdownSettings = environment.ngMultiSelectDropdownSetting;
    
    this.getCategoryList();
    this.createPostFormControl();
    this.createForm();
  }


  onCategorySelectionChange(event:any){
    this.subCategoryService.getSubCategoryByCategoryName(event).subscribe((response:APIResponse<SubCategory[]>)=>{
          this.subCategories = response.data;
          this.subCategory.reset()
          this.dropdownList=null;
          this.subCategory.enable()
        },(error)=>{
          this.subCategories = null
          this.dropdownList = null;
          this.tagSelectionDisable = true;
          this.subCategory.disable()
    })
  }

  onSubCategorySelection(event:any){
    this.tagParam.subCategoryName = event;
    this.tagService.getAllTagsBySubCategoryName(this.tagParam).subscribe((response:APIResponse<Tag[]>)=>{
      this.tagList = response.data;
      let tmp = [];
      for(let i=0; i<this.tagList.length; i++){
        tmp.push(this.tagList[i].tagName);
      }
      this.dropdownList = tmp;
      this.tagSelectionDisable = false;
    },(error)=>{
      this.tagSelectionDisable = true;
      this.tagList = null;
    })
  }

  createPostFormControl(){

    this.title = new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]);
    this.category = new FormControl("", Validators.required);
    this.subCategory = new FormControl(
      {
        value:"", 
        disabled:true
      },
       Validators.required);
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
      subCategory:this.subCategory,
      tags:this.tags,
      summary:this.summary,
      content: this.content
    });

    this.postData.title = this.postForm.get("title").value;
    this.postData.content = this.postForm.get("content").value;
    this.postData.summary = this.postForm.get("summary").value;
    this.selectedCategory = this.postForm.get("category").value; 
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