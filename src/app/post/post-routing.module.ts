import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPostComponent } from './view-post/view-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { AuthActivatedGuards } from '../core/guard/auth.guard';


const routes: Routes = [
    {
        path:'',
        component: ViewPostComponent,
    },
    {
      path:'create',
      component: CreatePostComponent,
      canActivate: [AuthActivatedGuards]
    },
    {
      path: 'edit',
      component: EditPostComponent
    },
    {
      path:'view',
      component:ViewPostComponent
    }
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PostRoutingModule { }