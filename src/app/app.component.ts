import { AfterViewInit, Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OAuthService } from 'angular-oauth2-oidc';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent  implements AfterViewInit {
  title = 'ng-commerxo-blog';

  constructor(
    private renderer2: Renderer2,
  @Inject(DOCUMENT) private _document:Document,
  private oauthService:OAuthService,
  private toastrService:ToastrService,
  private ngxLoaderService:NgxUiLoaderService
  ){

    this.ngxLoaderService.start();
    setTimeout(() => {
     this.ngxLoaderService.stop(); // stop foreground spinner of the master loader with 'default' taskId
   }, 5000);
  //  oauthService.loadDiscoveryDocument();
  }



ngAfterViewInit() {
  let loader = this.renderer2.selectRootElement('#loader');
  this.renderer2.setStyle(loader, 'display', 'none');
}

// 3. call them in ngOnInit
ngOnInit() {
 const s = this.renderer2.createElement('script');
 s.type = 'text/javascript';
 s.src = '../assets/main.js';
 this.renderer2.appendChild(this._document.body, s);


}



}
