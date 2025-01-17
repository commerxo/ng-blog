import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { ViewPostComponent } from './view-post/view-post.component';
import { SharedModule } from '../shared/shared.module';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewPostContentComponent } from './view-post-content/view-post-content.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SafeHtmlPipe } from '../shared/safe-html.pipe';
import { SafeHtmlTablePipe } from '../shared/safe-html-table.pipe';
import { PostListContentComponent } from './post-list-content/post-list-content.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdsenseModule } from 'ng2-adsense';
import { TagModule } from '../components/tag/tag.module';


@NgModule({
  declarations: [
    ViewPostComponent,
    CreatePostComponent,
    PostListComponent,
    EditPostComponent,
    SafeHtmlPipe,
    SafeHtmlTablePipe,
    PostEditorComponent,
    ViewPostContentComponent,
    PostListContentComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    EditorModule,
    FormsModule,
    AdsenseModule.forRoot(),
    ReactiveFormsModule,
    PostRoutingModule,
    AngularMultiSelectModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot()
  ], 
  exports:[
    PostListContentComponent
  ],
  providers:[
    {provide: TINYMCE_SCRIPT_SRC, useValue: "tinymce/tinymce.min.js"}
  ]
})
export class PostModule { }
