import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPostComponent } from './view-post/view-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { AuthActivatedGuards } from '../core/guard/auth.guard';
import { PostListComponent } from './post-list/post-list.component';
import { HomepageComponent } from '../components/home/homepage/homepage.component';


const routes: Routes = [
    // {
    //     path:'',
    //     component: HomepageComponent,
    // },

    {
      path:'create',
      component: CreatePostComponent,
      // canActivate: [AuthActivatedGuards]
    },
    {
      path: 'edit',
      component: EditPostComponent,
      canActivate: [AuthActivatedGuards]
    },
    {
      path:'title/:title/view',
      component:ViewPostComponent
    },
    {
      path:'list',
      component:PostListComponent
    }
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PostRoutingModule { }