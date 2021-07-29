import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './page/admin/admin.component';
import { EditorComponent } from './page/editor/editor.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { MovieEditComponent } from './page/movie-edit/movie-edit.component';
import { MoviesComponent } from './page/movies/movies.component';
import { AdminGuardService } from './service/admin-guard.service';
import { EditorGuardService } from './service/editor-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'movie',
    component: MoviesComponent,
  },
  {
    path: 'movie/edit/:id',
    component: MovieEditComponent,
  },
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [EditorGuardService],
    data: { // ez a property belekerül az aktív route obj-ba, így adom át a RoleGuardService-nek
      expectedRole: 2,
    }
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardService],
    data: {
      expectedRole: 3,
    }
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
