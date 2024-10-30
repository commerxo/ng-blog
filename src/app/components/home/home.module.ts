import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { HomeRoutingModule } from './home-routing.module';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselViewComponent } from './carousel-view/carousel-view.component';
import { TrendingPostListComponent } from './trending-post-list/trending-post-list.component';
import { TrendingPostListViewComponent } from './trending-post-list-view/trending-post-list-view.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    HomepageComponent,
    CarouselComponent,
    CarouselViewComponent,
    TrendingPostListComponent,
    TrendingPostListViewComponent
  ],
  imports: [
    CommonModule, 
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
