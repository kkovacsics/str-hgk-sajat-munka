import { createAction, props } from "@ngrx/store";
import { Movie } from "../../model/movie";


// constans names for actions
export const GET_ITEMS = '[Movie] get items';
export const LOAD_ITEMS = '[Movie] load items';

export const GET_ONE_ITEM = '[Movie] get item';
export const LOAD_SELECTED_ITEM = '[Movie] load selected';

export const ERROR_ITEM = '[Movie] error item';
export const FLUSH_ERROR = '[Movie] error flush' // a beragadt hibák kipucolására

  // Actions.
export const getItems = createAction(GET_ITEMS); // az összes movie-t le fogja kérni
export const loadItems = createAction( // visszaadja a lekérdezett movie-kat és eltárolja a store-ban
  LOAD_ITEMS,
  props<{items: Movie[]}>()  // milyen adatokat fog visszaadni
);

export const getOneItem = createAction( // egy movie-t kérek le
  GET_ONE_ITEM,
  props<{id: string | number}>() // kap egy id paramétert
);  
export const loadSelectedItems = createAction( // betölti az adott elemet a store-ba
  LOAD_SELECTED_ITEM,
  props<{selected: Movie}>()  // milyen adatokat fog visszaadni
);

export const errorItem = createAction( // ha hiba történik
  ERROR_ITEM,
  props<{error: any}>() // a hiba üzenet
);
export const errorFlush = createAction(FLUSH_ERROR)
