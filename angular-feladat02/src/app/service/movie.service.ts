import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  entity = 'movies';

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  get(id?: string | number): Observable<Movie | Movie[]> {
    let url = `${this.config.apiUrl}${this.entity}`;
    if (id) {
      url += `/${id}`;
    }

    return this.http.get<Movie[]>(url);
  }

}
