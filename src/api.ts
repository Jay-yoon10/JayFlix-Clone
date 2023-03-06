const API_KEY = '398e820aa504b180464ee0d28819cbe2';
const BASE_PATH = 'https://api.themoviedb.org/3';

export const LIST_TYPE = [
  'latestMovies',
  'upcomingMovies',
  'popularMovies',
  'tvShows',
];
export enum MovieType {
  LatestMovies = 'LatestMovies',
  PopularMovies = 'PopularMovies',
  TopRatedMovies = 'TopRatedMovies',
  UpcomingMovies = 'UpcomingMovies',
}
interface IMovie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
}
export interface IGetDataResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export function getLatestMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getPopularMovies() {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
