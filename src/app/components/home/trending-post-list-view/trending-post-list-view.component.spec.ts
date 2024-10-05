import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingPostListViewComponent } from './trending-post-list-view.component';

describe('TrendingPostListViewComponent', () => {
  let component: TrendingPostListViewComponent;
  let fixture: ComponentFixture<TrendingPostListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrendingPostListViewComponent]
    });
    fixture = TestBed.createComponent(TrendingPostListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
