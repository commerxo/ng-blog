import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch: 'full'
  },
  {
    path:'',
    loadChildren: () => import("./components/home/home.module").then(m=>m.HomeModule)
  },
  {
    path: 'post',
    loadChildren: () => import("./post/post.module").then(m=>m.PostModule),
  },


];

@NgModule({
  imports: 
  [RouterModule.forRoot(routes, {
    useHash: true,
    enableTracing: true
  }
)

  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
