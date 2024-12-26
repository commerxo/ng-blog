import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from '../home/home-routing.module';
import { TagListComponent } from './tag-list/tag-list.component';
import { ViewTagComponent } from './view-tag/view-tag.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TagRoutingModule } from './tag-routing.module';
import { PostModule } from 'src/app/post/post.module';



@NgModule({
  declarations: [
    TagListComponent,
    ViewTagComponent
  ],
  imports: [
    CommonModule,
    TagRoutingModule,
    PostModule
  ]
})
export class TagModule { }
