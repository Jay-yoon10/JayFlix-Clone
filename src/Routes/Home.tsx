import { useQuery } from 'react-query';
import {
  getLatestMovies,
  getPopularMovies,
  IGetDataResult,
  LIST_TYPE,
  MovieType,
} from '../api';
import styled from 'styled-components';
import { makeImagePath } from './utils';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import useWindowDimensions from '../useWindowDimensions';
import { useMatch, useNavigate } from 'react-router-dom';
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
    [MovieType.LatestMovies, 'latestMovies'],
    getLatestMovies
  );
  const { data: popularMovies } = useQuery<IGetDataResult>(
    [MovieType.PopularMovies, 'popularMovies'],
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
              data={popularMovies as IGetDataResult}
              title={'Popular Movies...'}
              type={'movie'}
              list={LIST_TYPE[1]}
              category={'home'}
            />
            {/* <Slider>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}> */}
            {/* <LeftButton
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='-200 0 720 500'
                  onClick={decreaseIndex}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.path d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z' />
                </LeftButton> */}
            {/* <TopRatedMovies
                  toggleLeaving={toggleLeaving}
                  index={index}
                  onBoxClicked={onBoxClicked}
                /> */}
            {/* <RightButton
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='-400 0 720 500'
                  onClick={increaseIndex}
                >
                  <motion.path d='M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z' />
                </RightButton> */}
            {/* </AnimatePresence>
            </Slider> */}
          </SliderContainer>
        </>
      )}
    </Wrapper>
  );
}
