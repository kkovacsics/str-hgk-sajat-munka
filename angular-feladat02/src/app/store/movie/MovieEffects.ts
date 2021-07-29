import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { Action, Store } from "@ngrx/store"
import { Observable, of } from "rxjs"
import { catchError, mergeMap, switchMap, tap, withLatestFrom } from "rxjs/operators"
import { MovieService } from "../../service/movie.service"
import { ERROR_ITEM, getItems, getOneItem, LOAD_ITEMS, LOAD_SELECTED_ITEM } from "./MovieActions"


@Injectable()
// nem állítom be, hogy provided inroot, hogy automatikusan injektálódjon
// hanem majd manuálisan injektálom

export class MovieEffect {

  getItems$ = createEffect((): Observable<Action> => {
    return this.actions$.pipe(
      ofType(getItems), // megadom, hogy milyen típusú action esetén fusson le a pipe
      switchMap(() => this.movieService.get()), // ha getItems az action, akkor a switshMap meghívja a service get metódusát
      switchMap(movies => of({ type: LOAD_ITEMS, items: movies })), // ha megjött a service-ből az adat, az of() csinál egy megfelelő formájú adatot és observable-ként tovább adja
      catchError(error=> of({ type: ERROR_ITEM, error })) // ha hiba volt, lekezelem
    )
  })
    
  // ha nem akarom mindig lekérni az adatot, akkor ha már benne van a store-ban, akkor onnan is elő lehet venni
  getOneItems$ = createEffect((): Observable<Action> => {
    return this.actions$.pipe(
      ofType(getOneItem), // megadom, hogy milyen típusú action esetén fusson le a pipe

      withLatestFrom(this.store$), // kiegészíti egy újabb obj-t (observable-t?) tesz hozzá
      switchMap(([action, store]) => {
        const cache = store.movies?.items?.find(item => item.id===action.id) // benne van-e már a cache-ben (store-ban)
        return cache? of(cache): this.movieService.get(action.id)
      }),
      // switchMap(action => this.userService.get(action.id)), // ha getOneItem az action, akkor a switchMap meghívja a service get metódusát az id-vel
      switchMap(movie => of({ type: LOAD_SELECTED_ITEM, selected: movie })), // ha megjött a service-ből az adat, az of() csinál egy megfelelő formájú adatot és observable-ként tovább adja
      catchError(error=> of({ type: ERROR_ITEM, error })) // ha hiba volt, lekezelem
    )
  })
    

  constructor( // az effect az action és a service között van
    private actions$: Actions,
    private movieService: MovieService,
    private store$: Store<any>,
  ) { }

}

