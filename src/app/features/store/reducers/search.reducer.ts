import { Book } from 'src/app/classes/book';
import * as SearchActions from '../actions/search.actions';
import _ from 'lodash'
import { AppState } from '../state/search.state';


export function reducer(state: AppState, action: SearchActions.Actions) {
    switch(action.type) {
        case SearchActions.KEY_UP_SEARCH:
            return {...state, searched: true};
        // case SearchActions.KEY_ENTER_SEARCH:
        //     return _.filter(state, { 'title' : action.payload});
        case SearchActions.INITIAL_STATE:
            return {
                userLogged: localStorage.getItem('currentUser') ? true: false, 
                userData: localStorage.getItem('currentUser')  ? JSON.parse(localStorage.getItem('currentUser')).username : "" ,
                books: [...action.payload],
                searched: false
            }
        case SearchActions.BOOKS_SEARCH_SUCCESS:
            return {...state, books: [...action.payload], searched: true }
        case SearchActions.USER_LOGIN:
            return {...state, userData: "", userLogged: action.payload};
        case SearchActions.USER_LOGOUT:
            return {...state, userData: "", userLogged: action.payload};

    }
}