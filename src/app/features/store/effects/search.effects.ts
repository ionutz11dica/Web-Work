import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';

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
    );
 
  constructor(
    private actions$: Actions,
    private searchService: ConfigService,
  ) {}
}