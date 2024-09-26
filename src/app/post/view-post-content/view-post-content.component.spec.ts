import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostContentComponent } from './view-post-content.component';

describe('ViewPostContentComponent', () => {
  let component: ViewPostContentComponent;
  let fixture: ComponentFixture<ViewPostContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPostContentComponent]
    });
    fixture = TestBed.createComponent(ViewPostContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
