const API_KEY = '398e820aa504b180464ee0d28819cbe2';
const BASE_PATH = 'https://api.themoviedb.org/3';

export const LIST_TYPE = [
  'latestMovies',
  'upcomingMovies',
  'topRatedMovies',
  'popularMovies',
  'getOnTheAir',
  'airingTodayTvShows',
  'popularTvShows',
  'topRatedTvShows',
  'search',
];
export enum Type {
  LatestMovies = 'LatestMovies',
  UpcomingMovies = 'UpcomingMovies',
  TopRatedMovies = 'TopRatedMovies',
  PopularMovies = 'PopularMovies',
  GetOnTheAir = 'GetOnTheAir',
  AiringToday = 'AiringToday',
  PopularTvShows = 'PopularTvShows',
  TopRatedTvShows = 'TopRatedTvShows',
  Search = 'Search',
}
interface IData {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  media_type?: string;
  release_date?: string;
  vote_average?: number;
  genres?: IGenre[];
}
interface IGenre {
  id?: number;
  name?: string;
}
export interface IGetDataResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IData[];
  total_pages: number;
  total_results: number;
}
export interface IGetSearch {
  page: number;
  results: IData[];
  total_pages: number;
  total_results: number;
}

export function getLatestMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getUpComingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getTopRatedMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getPopularMovies() {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getOnTheAir() {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getAiringToday() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getTopRatedTvShows() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getPopularTvShows() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}
export function getSearchData(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
}
