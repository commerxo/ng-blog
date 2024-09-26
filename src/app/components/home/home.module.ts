import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { HomeRoutingModule } from './home-routing.module';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselViewComponent } from './carousel-view/carousel-view.component';



@NgModule({
  declarations: [
    HomepageComponent,
    CarouselComponent,
    CarouselViewComponent
  ],
  imports: [
    CommonModule, 
    HomeRoutingModule
  ]
})
export class HomeModule { }
