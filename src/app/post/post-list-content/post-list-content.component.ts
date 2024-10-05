import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-list-content',
  templateUrl: './post-list-content.component.html',
  styleUrls: ['./post-list-content.component.sass']
})
export class PostListContentComponent {

  @Input("data") post:Post;


}
