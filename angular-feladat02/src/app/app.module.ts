import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MovieEffect } from './store/movie/MovieEffects';
import { MovieReducer } from './store/movie/MovieReducers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './page/nav/nav.component';
import { HomeComponent } from './page/home/home.component';
import { EditorComponent } from './page/editor/editor.component';
import { AdminComponent } from './page/admin/admin.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { JwtInterceptorService } from './service/jwt-interceptor.service';
import { LoginComponent } from './page/login/login.component';
import { MoviesComponent } from './page/movies/movies.component';
import { MovieEditComponent } from './page/movie-edit/movie-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    EditorComponent,
    AdminComponent,
    ForbiddenComponent,
    LoginComponent,
    MoviesComponent,
    MovieEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({movies: MovieReducer}), // meg kell mondani a store-nak, hogy honna kapja az adatokat
    EffectsModule.forRoot([MovieEffect]) // hol van definiálva az effect, több is lehet, ezért kell tömbben megadni
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
