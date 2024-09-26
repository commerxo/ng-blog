import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { SharedModule } from "./shared/shared.module";
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultOAuthInterceptor } from './core/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { SafeHtmlPipe } from './shared/safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TagListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    ReactiveFormsModule,
    CoreModule.forRoot(),
    NgbModule,
    SharedModule
],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:DefaultOAuthInterceptor, multi:true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
