import { useQuery } from 'react-query';
import {
  getLatestMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpComingMovies,
  IGetDataResult,
  LIST_TYPE,
  Type,
} from '../api';
import styled from 'styled-components';
import { makeImagePath } from './utils';

import Sliders from '../Components/Sliders';

const Wrapper = styled.div`
  background: black;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 4rem;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 1.5em;
  width: 50%;
  white-space: no-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SliderContainer = styled.div`
  position: relative;
  margin-top: -16.8rem;
`;

export default function Home() {
  const { data: latestMovies, isLoading } = useQuery<IGetDataResult>(
    [Type.LatestMovies, 'latestMovies'],
    getLatestMovies
  );
  const { data: upComingMovies } = useQuery<IGetDataResult>(
    [Type.UpcomingMovies, 'upComingMovies'],
    getUpComingMovies
  );
  const { data: topRatedMovies } = useQuery<IGetDataResult>(
    [Type.TopRatedMovies, 'topRatedMovies'],
    getTopRatedMovies
  );
  const { data: popularMovies } = useQuery<IGetDataResult>(
    [Type.PopularMovies, 'popularMovies'],
    getPopularMovies
  );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              latestMovies?.results[0].backdrop_path || ''
            )}
          >
            <Title>{latestMovies?.results[0].title}</Title>
            <Overview>{latestMovies?.results[0].overview}</Overview>
          </Banner>
          <SliderContainer>
            <Sliders
              data={latestMovies as IGetDataResult}
              title={'Latest Movies...'}
              type={'movie'}
              list={LIST_TYPE[0]}
              category={'home'}
            />
            <Sliders
              data={upComingMovies as IGetDataResult}
              title={'Upcoming Movies...'}
              type={'movie'}
              list={LIST_TYPE[1]}
              category={'home'}
            />
            <Sliders
              data={topRatedMovies as IGetDataResult}
              title={'Top Rated Movies...'}
              type={'movie'}
              list={LIST_TYPE[2]}
              category={'home'}
            />
            <Sliders
              data={popularMovies as IGetDataResult}
              title={'Popular Movies...'}
              type={'movie'}
              list={LIST_TYPE[3]}
              category={'home'}
            />
          </SliderContainer>
        </>
      )}
    </Wrapper>
  );
}
