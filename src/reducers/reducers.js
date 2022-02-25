import { combineReducers } from 'redux';
import * as actions from '../actions/actions';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConf = {
  key: 'root',
  storage,
  whitelist: ['userData', 'movieDetails'],
};

function movies(state = [], action) {
  switch (action.type) {
    case actions.SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case actions.SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movieDetails(state = {}, action) {
  switch (action.type) {
    case actions.GET_MOVIE_DETAILS:
      return action.value;
    default:
      return state;
  }
}

function genreDetails(state = {}, action) {
  switch (action.type) {
    case actions.GET_GENRE_DETAILS:
      return action.value;
    default:
      return state;
  }
}

function directorDetails(state = {}, action) {
  switch (action.type) {
    case actions.GET_DIRECTOR_DETAILS:
      return action.value;
    default:
      return state;
  }
}

function userData(state = {}, action) {
  switch (action.type) {
    case actions.SET_USER:
      return action.value;
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  userData,
  movies,
  visibilityFilter,
  directorDetails,
  genreDetails,
  movieDetails,
});

export default persistReducer(persistConf, rootReducer);
