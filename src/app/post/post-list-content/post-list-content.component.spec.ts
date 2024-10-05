import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListContentComponent } from './post-list-content.component';

describe('PostListContentComponent', () => {
  let component: PostListContentComponent;
  let fixture: ComponentFixture<PostListContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostListContentComponent]
    });
    fixture = TestBed.createComponent(PostListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
