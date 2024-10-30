import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent {

  constructor(private t:ToastrService){
    this.init()
  }

  init(){
    this.t.success("ss","ss");
  }
}
