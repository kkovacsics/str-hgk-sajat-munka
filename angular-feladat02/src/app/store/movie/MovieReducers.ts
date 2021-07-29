import { createReducer, on } from "@ngrx/store"
import { Movie } from "../../model/movie"
import { errorFlush, errorItem, loadItems, loadSelectedItems } from "./MovieActions"


export interface State {
  [x: string]: any // hogy később string kulccsal bármilyen új tulajdonságot meg tudjak adni
  movies: { items: Movie[], selected?: Movie, error: any } // milyen adatot kell tárolni
}

// létrehozom a kezdő értéket, kezdő állapotot
export const initialState: State = {
  movies: { items: [], selected: null, error: null }
}

export const MovieReducer = createReducer(
  initialState,
  on(loadItems, (state, action) => ({ // amikor megtörténik a loadItems, akkor eltárolja az adatokat a state-ben items néven
    ...state,
    items: action.items
  })), // ez egy esemény figyelő
  on(loadSelectedItems, (state, action) => ({ // amikor megtörténik a loadSelectedItems action, akkor eltárolja az adatokat a state-ben selected néven
    ...state,
    selected: action.selected
  })), // ez egy esemény figyelő
  on(errorItem, (state, action) => ({
    ...state,
    error: action.error
  })), // ez egy esemény figyelő
  on(errorFlush, (state, action) => ({
    ...state,
    error: null
  })) // ez egy esemény figyelő

)

// ahhoz, hogy az adatokat meg is tudjuk kapni a store-ból, ehhez kell a selector
// a state-t mindig megkapják automatikusan
export const selectItems = (state: State) => state.movies.items;
export const selectOneItem = (state: State) => Object.assign({}, state.movies.selected) // a store-ban lévő objektumok immutable, tehát módosíthatatlanok, de itt a movie-edit-ban módosítjuk
export const selectError = (state: State) => state.movies.error?.error;

