import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewTagComponent } from "./view-tag/view-tag.component";

const routes: Routes = [
  {
    path:'view/:tag',
    component: ViewTagComponent
  }
]
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TagRoutingModule { }