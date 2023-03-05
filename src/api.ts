const API_KEY = '398e820aa504b180464ee0d28819cbe2';
const BASE_PATH = 'https://api.themoviedb.org/3';

interface IMovie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
}
export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
