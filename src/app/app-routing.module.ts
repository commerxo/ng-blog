import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

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
  {
    path:'tag',
    loadChildren: () => import("./components/tag/tag.module").then(m=>m.TagModule)
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactUsComponent
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
