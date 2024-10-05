import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-trending-post-list-view',
  templateUrl: './trending-post-list-view.component.html',
  styleUrls: ['./trending-post-list-view.component.sass']
})
export class TrendingPostListViewComponent {

  @Input("post") post:Post;
}
