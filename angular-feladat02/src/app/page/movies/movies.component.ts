import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../../model/movie';
import { ConfigService } from '../../service/config.service';
import { MovieService } from '../../service/movie.service';
import { getItems } from '../../store/movie/MovieActions';
import { selectItems } from '../../store/movie/MovieReducers';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

    // list$: Observable<Movie | Movie[]> = this.movieService.get()
    list$: Observable<Movie | Movie[]>  // a store-ból fogja kapni az adatot
    cols: any[] = this.config.movieColumns
  
  constructor(
    private movieService: MovieService,
    private config: ConfigService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.list$ = this.store.pipe(select(selectItems)) // a store-ből jön az adat a selectItems szűrőn keresztül, tehát erre kell feliratkozni
    // az adatlekéréshez el kell indítani a folyamatot
    this.store.dispatch(getItems()) // ez az 1. lépés: a getItems action-t kiadjuk
  }

  delete(movie: Movie) {

  }
}
