import { Book } from 'src/app/classes/book';
import * as SearchActions from '../actions/search.actions';
import _ from 'lodash'


export function reducer(state: Book[], action: SearchActions.Actions) {
    switch(action.type) {
        case SearchActions.KEY_UP_SEARCH:
            return _.filter(state, { '_titleBook' : action.payload});
        case SearchActions.KEY_ENTER_SEARCH:
            return _.filter(state, { '_titleBook' : action.payload});
        case SearchActions.INITIAL_STATE:
            return [...action.payload]

    }
}