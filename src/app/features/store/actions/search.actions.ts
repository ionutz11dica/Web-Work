import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store';
import { Book } from 'src/app/classes/book';

export const KEY_UP_SEARCH = '[SEARCH] KEY UP';
export const KEY_ENTER_SEARCH = '[SEARCH] KEY ENTER';
export const INITIAL_STATE = '[SEARCH] INITIAL STATE';
export const LOAD_BOOKS = '[SEARCH] LOAD BOOKS';
export const BOOKS_SEARCH_SUCCESS = '[SEARCH] BOOKS SEARCH SUCCESS';
export const USER_LOGIN = '[SEARCH] USER LOGIN';
export const USER_LOGOUT = '[SEARCH] USER LOGOUT';

export class KeyUpSearch implements Action {
    readonly type = KEY_UP_SEARCH;

    constructor(public payload: string){}
}

export class KeyEnterSearch implements Action {
    readonly type = KEY_ENTER_SEARCH;

    constructor(public payload: Book[]){}
}

export class LoadBooksSearch implements Action {
    readonly type = LOAD_BOOKS;

    constructor(){}
}

export class InitialStateSearch implements Action {
    readonly type = INITIAL_STATE;

    constructor(public payload: Book[]){}
}

export class SearchSuccess implements Action {
    readonly type = BOOKS_SEARCH_SUCCESS;

    constructor(public payload: Book[]){}
}

export class UserLogin implements Action {
    readonly type = USER_LOGIN;

    constructor(public payload: boolean){}
}

export class UserLogout implements Action {
    readonly type = USER_LOGOUT;

    constructor(public payload: boolean){}
}

export type Actions = KeyUpSearch | LoadBooksSearch | KeyEnterSearch | InitialStateSearch | SearchSuccess | UserLogin | UserLogout;