import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingPostListComponent } from './trending-post-list.component';

describe('TrendingPostListComponent', () => {
  let component: TrendingPostListComponent;
  let fixture: ComponentFixture<TrendingPostListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrendingPostListComponent]
    });
    fixture = TestBed.createComponent(TrendingPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
