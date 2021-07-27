import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './page/nav/nav.component';
import { HomeComponent } from './page/home/home.component';
import { EditorComponent } from './page/editor/editor.component';
import { AdminComponent } from './page/admin/admin.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { JwtInterceptorService } from './service/jwt-interceptor.service';
import { LoginComponent } from './page/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    EditorComponent,
    AdminComponent,
    ForbiddenComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
