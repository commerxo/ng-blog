import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-view-post-content',
  templateUrl: './view-post-content.component.html',
  styleUrls: ['./view-post-content.component.sass',
  ]
})
export class ViewPostContentComponent implements OnInit{


  @Input("data") data;

  constructor(
    @Inject(DOCUMENT) private document:Document,

  ) { }

  ngOnInit(): void {
    this.loadCss("./../../../assets/tiny-mce.css")

  }

  loadCss(file){
    const headEl = this.document.getElementsByTagName('head')[0];
    const newLink = this.document.createElement("link");
    newLink.rel = "stylesheet";
    newLink.href = file;
    headEl.appendChild(newLink);
  }

}
