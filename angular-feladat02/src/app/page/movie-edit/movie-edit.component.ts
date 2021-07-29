import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../../model/movie';
import { MovieService } from '../../service/movie.service';
import { getOneItem } from '../../store/movie/MovieActions';
import { selectOneItem } from '../../store/movie/MovieReducers';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent implements OnInit {

  movie$: Observable<Movie | Movie[]> = null
  movieID: number

  constructor(
    private movieService: MovieService,
    private ar: ActivatedRoute,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.movieID = parseInt(this.ar.snapshot.params.id)
    // this.movie$ = this.movieService.get(this.movieID)
    this.movie$ = this.store.pipe(select(selectOneItem))
    this.store.dispatch(getOneItem({ id: this.movieID }))
  }

  onSubmit(ngForm: NgForm): void {
    history.back();
  }

}
