import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ConfigService } from '../../services/config.service';

@Injectable()
export class SearchEffects {
 
  @Effect()
  loadInitialState$ = this.actions$
    .pipe(
      ofType('[SEARCH] LOAD BOOKS'),
      mergeMap(() => this.searchService.getBooks()
        .pipe(
          map(search => ({ type: '[SEARCH] INITIAL STATE', payload: search.items })),
          catchError(() => EMPTY)
        )
      )
    );

  @Effect()
  keyUpSearch$ = this.actions$
    .pipe(
      ofType('[SEARCH] KEY UP'),
      mergeMap((payload:any,idx) => this.searchService.getSearch(payload.payload)
        .pipe(
          map(search => 
            ({ type: '[SEARCH] BOOKS SEARCH SUCCESS', payload: search.items }))
            ,
          catchError(() => EMPTY)
        )
      )
      // mergeMap((action) => this.searchService.getSearch(
      //   action.payload.searchQuery
      // ))
      // .map(payload => this.searchService.getSearch(payload))
    );
 
  constructor(
    private actions$: Actions,
    private searchService: ConfigService
  ) {}
}