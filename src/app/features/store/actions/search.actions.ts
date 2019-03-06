import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store';
import { Book } from 'src/app/classes/book';

export const KEY_UP_SEARCH = '[SEARCH] KEY UP';
export const KEY_ENTER_SEARCH = '[SEARCH] KEY ENTER';
export const INITIAL_STATE = '[SEARCH] INITIAL STATE';

export class KeyUpSearch implements Action {
    readonly type = KEY_UP_SEARCH;

    constructor(public payload: string){}
}

export class KeyEnterSearch implements Action {
    readonly type = KEY_ENTER_SEARCH;

    constructor(public payload: Book[]){}
}

export class InitialStateSearch implements Action {
    readonly type = INITIAL_STATE;

    constructor(public payload: Book[]){}
}

export type Actions = KeyUpSearch | KeyEnterSearch | InitialStateSearch;