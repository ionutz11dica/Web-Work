import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ConfigService } from '../../services/config.service';

@Injectable()
export class SearchEffects {
 
  @Effect()
  loadSearch$ = this.actions$
    .pipe(
      ofType('[SEARCH] INITIAL STATE'),
      mergeMap(() => this.searchService.getBooks()
        .pipe(
          map(search => ({ type: '[SEARCH] INITIAL STATE', payload: search })),
          catchError(() => EMPTY)
        )
      )
    );
 
  constructor(
    private actions$: Actions,
    private searchService: ConfigService
  ) {}
}