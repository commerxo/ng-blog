import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  NgxUiLoaderService,
  PB_DIRECTION,
  POSITION,
  SPINNER,
} from 'ngx-ui-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultOAuthInterceptor } from './core/token-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { SafeHtmlPipe } from './shared/safe-html.pipe';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.chasingDots, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};

@NgModule({
  declarations: [AppComponent, TagListComponent, AboutComponent, ContactUsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule.forRoot({
      "bgsColor": "#ffffff",
      "bgsOpacity": 0.1,
      "bgsPosition": "bottom-right",
      "bgsSize": 20,
      "bgsType": "rectangle-bounce-pulse-out-rapid",
      "blur": 1,
      "delay": 0,
      "fastFadeOut": true,
      "fgsColor": "#26232c",
      "fgsPosition": "center-center",
      "fgsSize": 60,
      "fgsType": "circle",
      "gap": 10,
      "logoPosition": "center-center",
      "logoSize": 60,
      "logoUrl": "",
      "masterLoaderId": "master",
      "overlayBorderRadius": "0",
      "overlayColor": "rgba(255,255,255,0.1)",
      "pbColor": "#26232c",
      "pbDirection": "ltr",
      "pbThickness": 2,
      "hasProgressBar": true,
      "text": "",
      "textColor": "#FFFFFF",
      "textPosition": "center-center",
      "maxTime": -1,
      "minTime": 300
    }),
    NgxUiLoaderHttpModule.forRoot({ 
      showForeground: true,
      loaderId:"loader-02"
    }),
    ReactiveFormsModule,
    CoreModule.forRoot(),
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultOAuthInterceptor,
      multi: true,
    },
    NgxUiLoaderService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
