// Action types
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const GET_MOVIE_DETAILS = 'GET_MOVIE_DETAILS';
export const GET_GENRE_DETAILS = 'GET_GENRE_DETAILS';
export const GET_DIRECTOR_DETAILS = 'GET_DIRECTOR_DETAILS';
export const SET_USER = 'SET_USER';

// Action creators (pure JS functions that return the action itself)
export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  };
}

export function getMovieDetails(value) {
  return {
    type: GET_MOVIE_DETAILS,
    value
  };
}

export function getGenreDetails(value) {
  return {
    type: GET_GENRE_DETAILS,
    value
  };
}

export function getDirectorDetails(value) {
  return {
    type: GET_DIRECTOR_DETAILS,
    value
  };
}

export function setUser(value) {
  return { type: SET_USER, value };
}