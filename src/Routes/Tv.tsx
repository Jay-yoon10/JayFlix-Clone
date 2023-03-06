import { useQuery } from 'react-query';
import {
  getAiringToday,
  getPopularTvShows,
  getTopRatedTvShows,
  getOnTheAir,
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

export const SliderContainer = styled.div`
  position: relative;
  margin-top: -16.8rem;
`;

export default function Tv() {
  const { data: ontheAir, isLoading } = useQuery<IGetDataResult>(
    [Type.GetOnTheAir, 'getOnTheAir'],
    getOnTheAir
  );
  const { data: airingToday } = useQuery<IGetDataResult>(
    [Type.AiringToday, 'airingTvShows'],
    getAiringToday
  );
  const { data: topRatedTvShows } = useQuery<IGetDataResult>(
    [Type.TopRatedTvShows, 'topRatedTvShows'],
    getTopRatedTvShows
  );
  const { data: popularTvShows } = useQuery<IGetDataResult>(
    [Type.PopularTvShows, 'popularTvShows'],
    getPopularTvShows
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              popularTvShows?.results[0].backdrop_path || ''
            )}
          >
            <Title>{popularTvShows?.results[0].name}</Title>
            <Overview>{popularTvShows?.results[0].overview}</Overview>
          </Banner>
          <SliderContainer>
            <Sliders
              data={popularTvShows as IGetDataResult}
              title={'Popular TV Shows...'}
              type={'tv'}
              list={LIST_TYPE[7]}
              category={'tvHome'}
            />
            <Sliders
              data={airingToday as IGetDataResult}
              title={'Airing Today...'}
              type={'tv'}
              list={LIST_TYPE[5]}
              category={'tvHome'}
            />
            <Sliders
              data={topRatedTvShows as IGetDataResult}
              title={'Top Rated TV shows...'}
              type={'tv'}
              list={LIST_TYPE[6]}
              category={'tvHome'}
            />
            <Sliders
              data={ontheAir as IGetDataResult}
              title={'On The Air...'}
              type={'tv'}
              list={LIST_TYPE[4]}
              category={'tvHome'}
            />
          </SliderContainer>
        </>
      )}
    </Wrapper>
  );
}
